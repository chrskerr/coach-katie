
// deps
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SearchInput, Button, Pane, Heading, Text, Select, IconButton } from "evergreen-ui";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Services, Queries, Loading } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Weeks / Add Workout
//


export default function UpdateWeekDayWorkoutPanel ({ props }) {
	const { id, title } = props;

	const { data, loading } = useQuery( Queries.workouts.getAll );
	const [ updateWeekday ] = useMutation( Queries.weeks.updateWeekday );
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const [ searchTerms, setSearchTerms ] = useState( "" );
	const [ filteredWorkouts, setFilteredWorkouts ] = useState( "" );
	const [ selectedWorkoutVersionId, setSelectedWorkoutVersionId ] = useState( "" );

	const workouts = _.get( data, "workouts" );
	const selectedWorkout = _.find( workouts, ({ versions }) => _.some( versions, [ "id", selectedWorkoutVersionId ]));
	const selectedWorkoutId = _.get( selectedWorkout, "id" );

	useEffect(() => setFilteredWorkouts( 
		_.orderBy( 
			_.map( workouts, workout => ({
				...workout,
				match: matchWorkout( searchTerms, workout ),
			})),
		), [ "match", "desc" ],
	), [ searchTerms, workouts ]);

	if ( loading ) return <Loading />;

	return ( <>
		<Pane marginBottom={ 56 }>
			<Heading size={ 600 }>Updating Workout for { title }</Heading>
		</Pane>
		<Formik
			initialValues={{}}
			onSubmit={ async () => {
				setErrors( null );
				try {
					await updateWeekday({ variables: { id, data: { _workouts_version: selectedWorkoutVersionId }}});
					closePanel();
				} catch ( error ) {
					console.error( error );
					setErrors( error.message );
				}
			}}
		>{
				({ handleSubmit, isSubmitting }) => {
					return (
						<>
							<form>
								<Pane marginBottom={ 48 }>
									<SearchInput placeholder="Filter available workouts on title and type" width="100%" onChange={ e => setSearchTerms( e.target.value.split( " " )) }/>
								</Pane>
								<Pane marginBottom={ 32 }>
									{ !_.isEmpty( filteredWorkouts ) && _.map( filteredWorkouts, workout => 
										<SearchRow 
											key={ workout.id } 
											workout={ workout } 
											matchSize={ _.size( searchTerms ) } 
											onSelect={ setSelectedWorkoutVersionId }
											selected={ workout.id === selectedWorkoutId } 
										/>, 
									)}
								</Pane>
								<Button iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !selectedWorkoutVersionId } onClick={ handleSubmit }>Add</Button>
								{ errors && <p>{ errors }</p>}
							</form> 
						</>
					);
				}}
		</Formik>
	</> );
}
UpdateWeekDayWorkoutPanel.propTypes = {
	props: PropTypes.object,
	id: PropTypes.string,
	title: PropTypes.string,
};

const matchWorkout = ( searchTerms, workout ) => {
	const { title, type } = workout;
	const terms = _.map( searchTerms, term => _.lowerCase( term ));
	return _.reduce( terms, ( total, curr ) => ( _.lowerCase( title ).includes( curr ) || _.lowerCase( type ).includes( curr )) ? total + 1 : total, 0 );
};

const SearchRow = ({ workout, matchSize, onSelect, selected }) => {
	const [ selectedVersion, setSelectedVersion ] = useState( false );
	const [ isTruncated, setIsTruncated ] = useState( true );
	const title = _.get( workout, "title" );
	const versions = _.get( workout, "versions" );
	const match = _.get( workout, "match" );
	const selectOptions = _.map( versions, ({ version_num }) => ({ label: `v${ version_num }`, value: version_num }));
	
	const version = _.find( versions, [ "version_num", selectedVersion ]);
	const versionId = _.get( version, "id" );
	const body = isTruncated ? _.truncate( _.get( version, "body" ), { lenght: 100 }) : _.get( version, "body" );

	useEffect(() => { if ( !selectedVersion ) setSelectedVersion( _.reduce( selectOptions, ( total, curr ) => curr.value > total ? curr.value : total, 0 ));}, [ selectOptions, selectedVersion ]);
	// eslint-disable-next-line
	useEffect(() => { if ( selected ) onSelect( versionId );}, [ versionId ]);
	
	let colourProps;
	if ( selected ) {
		colourProps = { color: "white", background: "#B7D4EF" };
	} else if ( match === matchSize ) {
		colourProps = { background: "white" };
	} else {
		colourProps = { background: "#66788A" };
	}

	const _handleTruncateClick = e => {
		e.preventDefault();
		setIsTruncated( !isTruncated );
	};

	if ( !selectedVersion ) return null;
	
	return (
		<Pane display="flex" flexDirection="row" elevation={ 1 } height={ 32 } alignItems="center" marginBottom={ 16 } paddingLeft={ 16 } paddingRight={ 8 } { ...colourProps } >
			<Pane flex={ 1 } onClick={ () => onSelect( versionId ) } display="flex" alignItems="center" marginRight={ 8 }>
				<Heading size={ 200 } { ...colourProps } marginRight={ 16 }>{ title }</Heading>
				<Text flex={ 1 }>{ body }</Text>
			</Pane>
			<Pane display="flex" alignItems="center">
				<IconButton icon="small-plus" appearance="minimal" onClick={ _handleTruncateClick } marginRight={ 8 } />
				<Select onChange={ e => setSelectedVersion( Number( e.target.value )) } defaultValue={ selectedVersion }>
					{ selectOptions && _.map( selectOptions, ({ value, label }) => <option key={ value } value={ value } >{ label }</option> )}
				</Select> 
			</Pane>
		</Pane>
	);
};
SearchRow.propTypes = {
	workout: PropTypes.object,
	matchSize: PropTypes.number,
	onSelect: PropTypes.func,
	selected: PropTypes.bool,
};
