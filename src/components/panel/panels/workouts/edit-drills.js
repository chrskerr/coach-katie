
// deps
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Pane, Paragraph, Heading, Select, Button, Text, IconButton } from "evergreen-ui";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Queries } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Workouts / Edit
//


export default function EditWorkoutVersionPanel ({ props }) {
	const { id } = props;
	const { data, loading } = useQuery( Queries.workouts.getVersion, { variables: { id }});
	const { data: drillsData, loading: drillsLoading } = useQuery( Queries.drills.getAll );
	const [ addDrill ] = useMutation( Queries.workouts.addDrill, { refetchQueries: [{ query: Queries.workouts.getVersion, variables: { id }}], awaitRefetchQueries: true });
	const [ removeDrill ] = useMutation( Queries.workouts.removeDrill, { refetchQueries: [{ query: Queries.workouts.getVersion, variables: { id }}], awaitRefetchQueries: true });
	const [ errors, setErrors ] = useState( null );

	if ( loading || drillsLoading ) return null;

	const version = _.get( data, "workouts_versions_by_pk" );
	const workoutsDrills = _.get( version, "drills", []);
	const currentDrills = _.map( workoutsDrills, drill => ({ workoutsDrillId: drill.id, ...drill.drill }));
	const allDrills = _.get( drillsData, "drills" );

	const unselectedDrills = _.filter( allDrills, drill => !_.some( currentDrills, [ "id", drill.id ]));
    
	return ( <>
		<Pane marginBottom={ 56 }>
			<Heading size={ 600 }>Editing Drills for Version { _.get( version, "version_num" ) } of workout: { _.get( version, "workout.title", "" ) }</Heading>
		</Pane>
		<Pane display="flex" flexDirection="row">
			<Pane width="50%">
				<Formik
					initialValues={{}}
					onSubmit={ async ({ drill }) => {
						setErrors( null );
						try {
							await addDrill({ variables: { objects: [{ _drill: drill, _workouts_version: _.get( version, "id" ) }]}});
						} catch ( error ) {
							console.error( error );
							setErrors( error.message );
						}
					}}
				>{
						({ values, dirty, handleChange, handleSubmit, isSubmitting }) => {
							return (
								<>
									<form>
										<Pane marginBottom={ 16 }>
											<Heading>Add Drills to Workout:</Heading>
										</Pane>
										<Pane marginBottom={ 8 } display="flex" justifyContent="space-between">
											<Select name="drill" value={ values.drill } onChange={ handleChange } height={ 32 } >
												<option key="empty" value="">Please select an option...</option>
												{ unselectedDrills && _.map( unselectedDrills, ({ id, title }) => ( <option key={ id } value={ id }>{ title }</option> ))}
											</Select>
											<Button iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty } onClick={ handleSubmit }>Add</Button>
										</Pane>
										<Pane>
											{ errors && <p>{ errors }</p>}
										</Pane>
									</form> 
								</>
							);
						}}
				</Formik>  
			</Pane>
			<Pane width="50%">
				<Pane marginBottom={ 16 }>
					<Heading>Selected drills:</Heading>
				</Pane>
				<Pane>
					{ !_.isEmpty( currentDrills ) ? _.map( currentDrills, ({ id, title, workoutsDrillId }) => (
						<Pane display="flex" flexDirection="row" elevation={ 1 } height={ 32 } alignItems="center" background="white" marginBottom={ 16 } key={ id } paddingLeft={ 16 } paddingRight={ 8 }>
							<Text flex={ 1 }>{ title }</Text>
							<IconButton icon="small-cross" intent="danger" appearance="minimal" onClick={ () => removeDrill({ variables: { id: workoutsDrillId }})}/> 
						</Pane> )) : <Paragraph>No drills selected</Paragraph>}
				</Pane>
			</Pane>
		</Pane>
	</> );
}
EditWorkoutVersionPanel.propTypes = {
	props: PropTypes.object,
	id: PropTypes.string,
};
