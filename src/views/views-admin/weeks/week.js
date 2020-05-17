
// deps
import React, { useContext, memo } from "react";
import PropTypes from "prop-types";
import { useSubscription, useMutation, useQuery } from "@apollo/react-hooks";
import _ from "lodash";
import { format, parseISO } from "date-fns";
import { Document, Paragraph as DocXParagraph, HeadingLevel, Packer } from "docx";
import { save } from "save-file";
import { Formik } from "formik";
import { ResponsiveBar } from "@nivo/bar";

// app
import { SelectField, Pane, Text, Paragraph, Heading, Badge, IconButton, Button } from "evergreen-ui";
import { Queries, Loading, Services, constants } from "../index";

//
// Adultletics Admin / Views / Week / Week
//


export default function Week ( props ) {
	const { id } = props;
	const { workoutTypes } = constants;
	const { data, loading } = useSubscription( Queries.weeks.subscribe, { variables: { id }});
	const { data: challengesData, loading: challengesLoading } = useQuery( Queries.dailyChallenges.getAll );
	const [ updateWeek ] = useMutation( Queries.weeks.updateWeek );
	const { openPanel } = useContext( Services.UI );

	if ( loading || challengesLoading ) return <Loading />;
    
	const week = _.get( data, "weeks_by_pk" );
	const { title, updated_at, days, id: weekId } = week;
    
	const workouts = _.compact( _.map( days, "workout" ));    
	const stats = _.compact( _.map( days, "workout.stats" ));

	const challenge = _.get( week, "daily_challenges.id", "" );
	const challenges = _.get( challengesData, "daily_challenges", []);
	const challengeSelectOptions = _.map( challenges, ({ id, title }) => ({ value: id, label: title }));

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<Button marginLeft={ 8 } iconBefore="arrow-down" onClick={ e => _handleDownload( week, e ) }>Download DOCX</Button>
			</Pane>
			<Pane marginBottom={ 32 } display="flex" flexDirection="row" alignItems="center">
				<Pane marginRight={ 16 }>
					<Heading>{ title }</Heading>
				</Pane>
				<Pane flex={ 1 }>
					<Text>Last updated: <Badge color="blue">{ format( parseISO( updated_at ), "dd MMM yyyy @ h:mm a" ).replace( "@", "at" ) }</Badge></Text>
				</Pane>
			</Pane>
			<Pane marginBottom={ 32 } >
				<Formik
					initialValues={{ challenge: _.isNull( challenge ) ? "" : challenge }}
					onSubmit={ async ({ challenge }) => {
						console.log( challenge );
						try {
							await updateWeek({ variables: { id, data: { _challenge: challenge }}});
						} catch ( error ) {
							console.error( error );
						}
					}}
					enableReinitialize={ true }
				>{
						({ values, handleSubmit, handleChange }) => {
							return (
								<>
									<form>
										<Pane display="flex" width="50%" flexDirection="row" alignItems="center">
											<SelectField flex={ 1 } label="Add a challenge" name="challenge" value={ values.challenge } onChange={ e => {
												handleChange( e );
												handleSubmit();
											}} height={ 40 }>
												<option key="empty" value="">Please select one...</option>
												{ challengeSelectOptions && _.map( challengeSelectOptions, ({ value, label }) => ( 
													<option key={ value } value={ value }>{ label }</option> 
												))}
											</SelectField>
										</Pane>
									</form> 
								</>
							);
						}}
				</Formik>
			</Pane>
			<Pane display="flex" justifyContent="space-between" marginBottom={ 32 }>
				{ days && _.map( days, day => {
					const { id, day: { title }, workout } = day;
					const workoutTitle = _.get( workout, "workout.title" );
					const workoutVersion = _.get( workout, "version_num" );
					const workoutVersionId = _.get( workout, "id", "" );
					const type = _.get( workout, "workout.type" );
					return (
						<Pane key={ id } elevation={ 1 } width="12%" background="white" paddingLeft={ 16 } paddingBottom={ 16 }>
							<Pane display="flex" justifyContent="space-between" alignItems="flex-end" marginBottom={ 8 }>
								<Heading size={ 200 }>{ title }</Heading>
								<IconButton icon="small-plus" appearance="minimal" onClick={ () => openPanel({ panel: "weeks/update-workout", props: { id, title, weekId }, size: "wide" })} />
							</Pane>
							<Pane paddingRight={ 16 }>
								{ _.isEmpty( workout ) ? 
									<Text color='red'>No workout chosen</Text> : 
									<div onClick={ () => openPanel({ panel: "weeks/view-workout-version", props: { id: workoutVersionId }, size: "wide" })}>
										<Paragraph marginBottom={ 8 }>{ workoutTitle } - v{ workoutVersion }</Paragraph>
										<Badge color="blue">{ _.get( _.find( workoutTypes, [ "value", type ]), "label" ) }</Badge>
									</div>
								}
							</Pane>
						</Pane>
					);
				})}
			</Pane>
			<Pane marginBottom={ 40 }>
				<Heading marginBottom={ 8 }>Stats:</Heading>
				<Pane display="flex" justifyContent="space-between">
					<Pane background="white" padding={ 32 } elevation={ 1 } marginBottom={ 24 } width="45%">
						<Heading size={ 200 }>Workout Minutes:</Heading>
						<Pane height={ 250 }>
							<WeeksMinutesSplit stats={ stats } />
						</Pane>
					</Pane>
					<Pane background="white" padding={ 32 } elevation={ 1 } marginBottom={ 24 } width="45%">
						<Heading size={ 200 }>Energy Systems:</Heading>
						<Pane height={ 250 }>
							<EnergySystemSplit workouts={ workouts } />
						</Pane>
					</Pane>
				</Pane>
			</Pane>
		</>
	);
}
Week.propTypes = {
	id: PropTypes.string,
};

const _handleDownload = ( week, e ) => {
	e.preventDefault();

	const { title, days, daily_challenge } = week;    
	const doc = new Document();

	const children = [ new DocXParagraph({ text: title, heading: HeadingLevel.HEADING_1 }) ];

	if ( daily_challenge && !_.isEmpty( daily_challenge )) {
		//add challenge to word doc
	}

	_.forEach( days, day => {
		const title = _.get( day, "day.title", "" );
		const workout = _.get( day, "workout", []);
		const drills = _.compact( _.get( day, "workout.drills", []));
    
		children.push( new DocXParagraph({ text: title, heading: HeadingLevel.HEADING_3, spacing: { before: 300 }}));
    
		if ( _.isEmpty( workout )) { 
			children.push( new DocXParagraph({ text: "Nothing assigned today, rest day!" }));
		} else {
			if ( !_.isEmpty( drills )) {
				const drillsText = _.map( drills, ({ drill: { title, url }}) => new DocXParagraph({ text: `${ title }: ${ url }`, bullet: { level: 0 }}));
				children.push( new DocXParagraph({ text: "Please perform the following drills:", heading: HeadingLevel.HEADING_4 }));
				children.push( ...drillsText );
			}
			children.push( new DocXParagraph({ text: workout.body }));
		}
	});
    
	doc.addSection({ children });
	Packer.toBlob( doc ).then( blob => save( blob, `${ title }.docx` ));
};

const EnergySystemSplit = memo( function EnergySystemSplit ({ workouts }) {
	const { workoutTypes } = constants;
	const allEnergySystems =  _.uniq( _.map( workoutTypes, "system" )).sort();
	const workoutsEnergySystemMap = _.map( workouts, workout => _.get( _.find( workoutTypes, [ "value", _.get( workout, "workout.type" ) ]), "system" ));
	const graphData = _.map( allEnergySystems, system => ({ id: _.capitalize( _.nth( system.split( " " ), 1 )), value: _.size( _.filter( workoutsEnergySystemMap, el => el === system )) }));

	return (
		<ResponsiveBar
			data={ graphData }
			margin={{ top: 16, right: 16, bottom: 16, left: 72 }}
			layout="horizontal"
			colors={{ scheme: "category10" }}
			colorBy="index"
			justify={ true }
			axisTop={ null }
			axisRight={ null }
			axisBottom={ null }
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legendPosition: "middle",
				legendOffset: -40,
			}}
			isInteractive={ false }
			enableGridY={ false }
		/>
	);
}, _.isEqual );
EnergySystemSplit.propTypes = {
	workouts: PropTypes.array,
};

const WeeksMinutesSplit = memo( function WeeksMinutesSplit ({ stats }) {

	const graphData = _.map([ "short", "long" ], id => ({
		id: id === "short" ? "5/10km" : "half/ultra",
		beginner: _.reduce( stats, ( total, curr ) => _.isNull( _.get( curr, `running_minutes_beginner_${ id }`, 0 )) ? total : total + _.get( curr, `running_minutes_beginner_${ id }`, 0 ), 0 ),
		intermediate: _.reduce( stats, ( total, curr ) => _.isNull( _.get( curr, `running_minutes_intermediate_${ id }`, 0 )) ? total : total + _.get( curr, `running_minutes_intermediate_${ id }`, 0 ), 0 ),
		advanced: _.reduce( stats, ( total, curr ) => _.isNull( _.get( curr, `running_minutes_advanced_${ id }`, 0 )) ? total : total + _.get( curr, `running_minutes_advanced_${ id }`, 0 ), 0 ),
	}));
    
	return (
		<ResponsiveBar
			data={ graphData }
			margin={{ top: 16, right: 16, bottom: 32, left: 64 }}
			innerPadding={ 2 }
			keys={[ "beginner", "intermediate", "advanced" ]}
			layout="horizontal"
			groupMode="grouped"
			colors={{ scheme: "category10" }}
			justify={ true }
			axisTop={ null }
			axisRight={ null }
			axisBottom={ null }
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legendPosition: "middle",
				legendOffset: -40,
			}}
			isInteractive={ false }
			enableGridY={ false }
			legends={[
				{
					dataFrom: "keys",
					anchor: "bottom",
					direction: "row",
					translateX: 0,
					translateY: 32,
					itemWidth: 128,
					itemHeight: 16,
					itemDirection: "left-to-right",
					symbolSize: 16,
				},
			]}
		/>
	);
}, _.isEqual );
WeeksMinutesSplit.propTypes = {
	stats: PropTypes.array,
};
