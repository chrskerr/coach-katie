
// deps
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Radio, Select, TextInputField, Heading, Pane, Textarea, FormField, Button, Text, IconButton, Paragraph } from "evergreen-ui";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Services, Queries, constants, Loading } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Workouts / Edit
//


export default function EditWorkoutVersionPanel ({ props }) {
	const { id } = props;
	const { data, loading } = useQuery( Queries.workouts.getVersion, { variables: { id }});
	const { data: drillsData, loading: drillsLoading } = useQuery( Queries.drills.getAll );
	const [ updateVersion ] = useMutation( Queries.workouts.updateVersion, { refetchQueries: [{ query: Queries.workouts.getVersion, variables: { id }}], awaitRefetchQueries: true });
	const [ addDrill, { addDrillsLoading }] = useMutation( Queries.workouts.addDrill, { refetchQueries: [{ query: Queries.workouts.getVersion, variables: { id }}], awaitRefetchQueries: true });
	const [ removeDrill ] = useMutation( Queries.workouts.removeDrill, { refetchQueries: [{ query: Queries.workouts.getVersion, variables: { id }}], awaitRefetchQueries: true });
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const { intensityOptions, workoutTypes } = constants;

	if ( loading || drillsLoading ) return <Loading />;

	const version = _.get( data, "workouts_versions_by_pk" );

	const initialValues = {
		body: _.get( version, "body" ),
		title: _.get( version, "workout.title", "" ),
		running_km: _.get( version, "stats.running_km", 0 ),
		running_minutes: _.get( version, "stats.running_minutes", 0 ),
		intensity: _.get( version, "workout.intensity", "3" ),
		type: _.get( version, "workout.type", "" ),
	};
    
	const workoutsDrills = _.get( version, "drills", []);
	const currentDrills = _.map( workoutsDrills, drill => ({ workoutsDrillId: drill.id, ...drill.drill }));
	const allDrills = _.get( drillsData, "drills" );

	const unselectedDrills = _.filter( allDrills, drill => !_.some( currentDrills, [ "id", drill.id ]));

	return (
		<>
			<Pane marginBottom={ 56 }>
				<Heading size={ 600 }>Editing version { _.get( version, "version_num" ) } of workout: { _.get( version, "workout.title", "" ) }</Heading>
			</Pane>
			<Formik
				initialValues={{ ...initialValues }}
				onSubmit={ async ({ title, body, running_km, running_minutes, type, intensity }) => {
					setErrors( null );
					try {
						await updateVersion({ variables: {
							version_id: id,
							workout_id: _.get( version, "workout.id" ),
							stats_id: _.get( version, "stats.id" ),
							body,
							workout_data: {
								title,
								type,
								intensity,
							},
							stats_data: {
								running_minutes,
								running_km,
							},
						}});
						closePanel();
					} catch ( error ) {
						console.error( error );
						setErrors( error.message );
					}
				}}
			>{
					({ values, dirty, handleChange, handleSubmit, isSubmitting, setFieldValue }) => {
						return (
							<>
								<form>
									<TextInputField
										label="Workout Title (effects all versions)"
										name="title"
										value={ values.title }
										onChange={ handleChange }
										autoFocus
									/>
									<FormField label="Workout Intensity (effects all versions)" onChange={ e => setFieldValue( "intensity", e.target.value ) } marginBottom={ 16 }>
										<Pane display="flex" flexDirection="row" justifyContent="space-between">
											{ _.map( intensityOptions, ({ label, value }) => (
												<Radio key={ value } name="intensity" value={ value } label={ label } checked={ value === values.intensity }/>
											))}
										</Pane>
									</FormField>
									<FormField label="Workout Type (effects all versions)" marginBottom={ 16 }>
										<Select name="type" value={ values.type } onChange={ handleChange } height={ 32 } >
											<option key="empty" value="">Please select an option...</option>
											{ workoutTypes && _.map( workoutTypes, ({ value, label }) => ( <option key={ value } value={ value }>{ label }</option> ))}
										</Select>
									</FormField>
									<Pane>
										<Pane marginBottom={ 16 }>
											<Heading>Add Drills to Workout:</Heading>
										</Pane>
										<Pane marginBottom={ 8 } display="flex" justifyContent="space-between">
											<Select name="drill" value={ values.drill } onChange={ handleChange } height={ 32 }>
												<option key="empty" value="">Please select an option...</option>
												{ unselectedDrills && _.map( unselectedDrills, ({ id, title }) => ( <option key={ id } value={ id }>{ title }</option> ))}
											</Select>
											<Button 
												iconBefore={ addDrillsLoading ? "" : "tick"} 
												isLoading={ addDrillsLoading } 
												disabled={ !values.drill } 
												onClick={ e => {
													e.preventDefault();
													addDrill({ variables: { objects: [{ _drill: values.drill, _workouts_version: _.get( version, "id" ) }]}}); 
												}} 
												marginRight={ 8 } 
												marginLeft={ 8 }>Attach drill
											</Button>
										</Pane>
										<Pane>
											{ errors && <p>{ errors }</p>}
										</Pane>
									</Pane>
									<Pane>
										<Pane marginBottom={ 16 }>
											<Heading>Selected drills:</Heading>
										</Pane>
										<Pane>
											{ !_.isEmpty( currentDrills ) ? _.map( currentDrills, ({ id, title, workoutsDrillId }) => (
												<Pane display="flex" flexDirection="row" elevation={ 1 } height={ 32 } alignItems="center" background="white" marginBottom={ 16 } key={ id } paddingLeft={ 16 } paddingRight={ 8 }>
													<Text flex={ 1 }>{ title }</Text>
													<IconButton icon="small-cross" intent="danger" appearance="minimal" onClick={ e => {
														e.preventDefault();
														removeDrill({ variables: { id: workoutsDrillId }});
													}}/> 
												</Pane> )) : <Paragraph>No drills selected</Paragraph>}
										</Pane>
									</Pane>
									<FormField label="Workout Description" marginBottom={ 16 }>
										<Textarea
											name="body"
											value={ values.body }
											onChange={ handleChange }
											rows={ 24 }
										/>
									</FormField>
									<TextInputField
										label="Total Running KM"
										name="running_km"
										type="number"
										value={ values.running_km }
										onChange={ handleChange }
									/>
									<TextInputField
										label="Total Running Minutes"
										name="running_minutes"
										type="number"
										value={ values.running_minutes }
										onChange={ handleChange }
									/>
									<Button iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty } onClick={ handleSubmit }>Update</Button>
									{ errors && <p>{ errors }</p>}
								</form> 
							</>
						);
					}}
			</Formik>
		</>
	);
}
EditWorkoutVersionPanel.propTypes = {
	props: PropTypes.object,
	id: PropTypes.string,
};
