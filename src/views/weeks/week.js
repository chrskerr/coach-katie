
// deps
import React, { useContext, memo } from "react";
import PropTypes from "prop-types";
import { useSubscription, useMutation, useQuery } from "@apollo/react-hooks";
import _ from "lodash";
import { format, parseISO } from "date-fns";
import { Document, Paragraph as DocXParagraph, HeadingLevel, Packer } from "docx";
import { save } from "save-file";
import { Formik } from "formik";

// app
import { SelectField, Pane, Paragraph, Text, Heading, Badge, IconButton, Button } from "evergreen-ui";
import { Queries, Loading, Services, constants } from "../index";

//
// Adultletics Admin / Views / Week / Week
//


export default function Week ( props ) {
	const { id } = props;
	const { data, loading } = useSubscription( Queries.weeks.subscribe, { variables: { id }});
	const { data: challengesData, loading: challengesLoading } = useQuery( Queries.dailyChallenges.getAll );
	const [ updateWeek ] = useMutation( Queries.weeks.updateWeek );
	const { openPanel } = useContext( Services.UI );

	if ( loading || challengesLoading ) return <Loading />;

	const week = _.get( data, "weeks[0]" );
	const { title, updated_at, days } = week;
    
	const workouts = _.compact( _.map( days, "workout" ));    
    
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
					return (
						<Pane key={ id } elevation={ 1 } width="12%" background="white" paddingLeft={ 16 } paddingBottom={ 16 }>
							<Pane display="flex" justifyContent="space-between" alignItems="flex-end" marginBottom={ 8 }>
								<Heading size={ 200 }>{ title }</Heading>
								<IconButton icon="small-plus" appearance="minimal" onClick={ () => openPanel({ panel: "weeks/update-workout", props: { id, title }, size:"wide" })} />
							</Pane>
							<Pane paddingRight={ 16 }>
								{ _.isEmpty( workout ) ? 
									<Text color='red'>No workout chosen</Text> : 
									<Text>{ workoutTitle } - v{ workoutVersion }</Text>
								}
							</Pane>
						</Pane>
					);
				})}
			</Pane>
			<Pane>
				<Heading marginBottom={ 8 }>Stats:</Heading>
				<Pane display="flex" justifyContent="space-between">
					<Pane elevation={ 1 } background="white" padding={ 16 } width={ "20%" }>
						<Paragraph>Total Running KM: <Text>55</Text></Paragraph>
						<Paragraph>Total Running Mins: <Text>55</Text></Paragraph>
					</Pane>
					<Pane elevation={ 1 } background="white" padding={ 16 } width={ "20%" }>
						<EnergySystemSplit workouts={ workouts } />
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
	const { workoutTypes, intensityOptions } = constants;

	const allEnergySystems = _.orderBy( _.uniqBy( _.map( workoutTypes, "system" ), "id" ), "id" );
	const workoutsEnergySystemMap = _.map( workouts, workout => _.get( _.find( workoutTypes, [ "value", _.get( workout, "workout.type" ) ]), "system" ));
    
	const graphData = _.map( allEnergySystems, system => ({ id: system, value: _.size( _.filter( workoutsEnergySystemMap, el => el === system )) }));

	console.log( graphData );

	return (
		<p>Here</p>
	);
}, _.isEqual );
EnergySystemSplit.propTypes = {
	workouts: PropTypes.array,
};
