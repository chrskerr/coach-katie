
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
	const { id, title, weekId } = props;

	const { data, loading } = useQuery( Queries.workouts.getAll );
	const [ updateWeekday ] = useMutation( Queries.weeks.updateWeekday, { refetchQueries: [{ query: Queries.weeks.getOne, id: weekId }], awaitRefetchQueries: true });
	const { closePanel, openPanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const [ searchTerms, setSearchTerms ] = useState( "" );
	const [ filteredWorkouts, setFilteredWorkouts ] = useState( "" );
	const [ selectedWorkoutVersionId, setSelectedWorkoutVersionId ] = useState( "" );

	const workouts = _.get( data, "workouts" );
	const selectedWorkout = _.find( workouts, ({ versions }) => _.some( versions, [ "id", selectedWorkoutVersionId ]));
	const selectedWorkoutId = _.get( selectedWorkout, "id" );

	useEffect(() => setFilteredWorkouts( 
		_.orderBy( _.map( workouts, workout => ({
			...workout,
			match: matchWorkout( searchTerms, workout ),
		})), [ "match" ], [ "desc" ])), [ searchTerms, workouts ]);
    
	const _handleWorkoutAdd = () => {
		closePanel();
		setTimeout(() => openPanel({ panel: "workouts/add", size: "wide", props: { emit: async workoutVersionId => { 
			try {
				await updateWeekday({ variables: { id, data: { _workouts_version: workoutVersionId }}});
				closePanel();
			} catch ( error ) {
				console.error( error );
				setErrors( error.message );
			}
		} }}), 200 );
	};

	const _handleClearWorkout = async e => {
		e.preventDefault();
		setErrors( null );
		try {
			await updateWeekday({ variables: { id, data: { _workouts_version: null }}});
			closePanel();
		} catch ( error ) {
			console.error( error );
			setErrors( error.message );
		}
	};

	if ( loading ) return <Loading />;

	return ( <>
		<Pane marginBottom={ 56 } display="flex" justifyContent="space-between">
			<Heading size={ 600 }>Updating Workout for { title }</Heading>
			<Button marginLeft={ 8 } iconBefore="plus" onClick={ _handleWorkoutAdd }>Create workout</Button>
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
								<Pane display="flex" justifyContent="space-between">
									<Button type="submit" iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !selectedWorkoutVersionId } onClick={ handleSubmit }>Add / Update Workout</Button>
									<Button iconBefore={ isSubmitting ? "" : "cross"} intent="danger" isLoading={ isSubmitting } onClick={ _handleClearWorkout }>Clear Day</Button>
									{ errors && <p>{ errors }</p>}
								</Pane>

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
	weekId: PropTypes.string,
};

const matchWorkout = ( searchTerms, workout ) => {
	const { title, type } = workout;
	const terms = _.map( searchTerms, term => _.lowerCase( term ));
	return _.reduce( terms, ( total, curr ) => ( _.lowerCase( title ).includes( curr ) || _.lowerCase( type ).includes( curr )) ? total + 1 : total, 0 );
};

const getInitialSelectedState = workout => {
	const versions = _.get( workout, "versions" );
	const selectOptions = _.map( versions, ({ version_num }) => ({ label: `v${ version_num }`, value: version_num }));
	return _.reduce( selectOptions, ( total, curr ) => curr.value > total ? curr.value : total, 0 );
};

const SearchRow = ({ workout, matchSize, onSelect, selected }) => {
	const [ selectedVersion, setSelectedVersion ] = useState( getInitialSelectedState( workout ));
	const [ isTruncated, setIsTruncated ] = useState( true );
	const title = _.get( workout, "title" );
	const versions = _.get( workout, "versions" );
	const match = _.get( workout, "match" );
	const selectOptions = _.map( versions, ({ version_num }) => ({ label: `v${ version_num }`, value: version_num }));
	
	const version = _.find( versions, [ "version_num", selectedVersion ]);
	const versionId = _.get( version, "id" );
	const body = isTruncated ? _.truncate( _.get( version, "body" ), { lenght: 100 }) : _.get( version, "body" );
    
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
    
	const _handleSelectClick = () => {
		if ( selected ) { 
			onSelect( "" );
		} else {
			onSelect( versionId );
		}
	};
	
	return (
		<Pane display="flex" flexDirection="row" minHeight={ 32 } marginBottom={ 16 }>
			<Pane display="flex">
				<Select onChange={ e => setSelectedVersion( Number( e.target.value )) } defaultValue={ selectedVersion }>
					{ selectOptions && _.map( selectOptions, ({ value, label }) => <option key={ value } value={ value } >{ label }</option> )}
				</Select> 
				<IconButton icon={ isTruncated ? "expand-all" : "collapse-all" } iconSize={ 10 } appearance="minimal" onClick={ _handleTruncateClick }/>
			</Pane>
			<Pane { ...colourProps } elevation={ 1 } display="flex" flex={ 1 } onClick={ _handleSelectClick } paddingLeft={ 16 } paddingRight={ 16 } paddingBottom={ isTruncated ? 0 : 16 } paddingTop={ isTruncated ? 0 : 16 }>
				<Pane display="flex" alignItems="center">
					<Heading size={ 300 } marginRight={ 16 }>{ title }</Heading>
				</Pane>
				<Pane flex={ 1 } display="flex" flexDirection="column" justifyContent="center">
					{ body && _.map( body.split( "\n" ), ( line, i ) => line ? <Text key={ i }>{ line }</Text> : <br key={ i } /> )}
				</Pane>
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
