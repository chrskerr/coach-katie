
// deps
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Radio, Select, TextInputField, Textarea, FormField, Button, Pane, Heading, Text, IconButton, Paragraph } from "evergreen-ui";
import { Formik } from "formik";
import { useMutation, useQuery } from "@apollo/react-hooks";
import _ from "lodash";
import { useHistory } from "react-router-dom";

// app
import { Services, Queries, constants, Loading } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Workouts / Add
//


export default function AddWorkoutPanel ({ props }) {
	const { emit } = props;
	const { data: drillsData, loading: drillsLoading } = useQuery( Queries.drills.getAll );
	const [ addVersion ] = useMutation( Queries.workouts.addVersion, { refetchQueries: [{ query: Queries.workouts.getAll }], awaitRefetchQueries: true }); 
	const { authUser } = useContext( Services.Auth );
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const [ selectedDrills, setSelectedDrills ] = useState([]);
	const { intensityOptions, workoutTypes } = constants;
	const history = useHistory();
    
	const allDrills = _.get( drillsData, "drills" );
	const unselectedDrills = _.filter( allDrills, drill => !_.some( selectedDrills, [ "id", drill.id ]));

	if ( drillsLoading ) return <Loading />;

	return (
		<>
			<Pane marginBottom={ 56 }>
				<Heading size={ 600 }>Adding a new workout</Heading>
			</Pane>
			<Formik
				initialValues={{ running_km: 0, running_minutes: 0, intensity: "3" }}
				onSubmit={ async ({ title, body, running_km, running_minutes, intensity, type }) => {
					setErrors( null );
					const drills_insert_data = _.map( selectedDrills, ({ id }) => ({ _drill: id }));
					console.log( drills_insert_data );
					try {
						const res = await addVersion({ variables: { objects: [{
							version_num: 1,
							_owner: authUser.id,
							body,
							workout: {
								data: {
									title, type,
									intensity,
								},
							},
							stats: {
								data: {
									running_km, running_minutes,
								},
							},
							drills: {
								data: drills_insert_data,
							},

						}]}});
						closePanel();
						const versionId = _.get( res, "data.insert_workouts_versions.returning[0].id" );
						const workoutId = _.get( res, "data.insert_workouts_versions.returning[0].workout.id" );
						if ( emit ) emit( versionId );
						if ( !emit ) history.push( `/workouts/${ workoutId }` );
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
										label="Workout Title"
										name="title"
										onChange={ handleChange }
										autoFocus
									/>
									<FormField label="Workout Intensity" onChange={ e => setFieldValue( "intensity", e.target.value ) } marginBottom={ 16 }>
										<Pane display="flex" flexDirection="row" justifyContent="space-between">
											{ _.map( intensityOptions, ({ label, value }) => (
												<Radio key={ value } name="intensity" value={ value } label={ label } checked={ value === values.intensity } />
											))}
										</Pane>
									</FormField>
									<FormField label="Workout Type" marginBottom={ 16 }>
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
												iconBefore="tick"
												disabled={ !values.drill } 
												onClick={ e => {
													e.preventDefault();
													setSelectedDrills([ ...selectedDrills, _.find( allDrills, [ "id", values.drill ]) ]); 
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
											{ !_.isEmpty( selectedDrills ) ? _.map( selectedDrills, ({ id, title }) => (
												<Pane display="flex" flexDirection="row" elevation={ 1 } height={ 32 } alignItems="center" background="white" marginBottom={ 16 } key={ id } paddingLeft={ 16 } paddingRight={ 8 }>
													<Text flex={ 1 }>{ title }</Text>
													<IconButton icon="small-cross" intent="danger" appearance="minimal" onClick={ e => {
														e.preventDefault();
														setSelectedDrills( _.filter( selectedDrills, drill => drill.id !== id ));
													}}/> 
												</Pane> )) : <Paragraph marginBottom={ 16 } >No drills selected</Paragraph>}
										</Pane>
									</Pane>
									<FormField label="Workout Description" marginBottom={ 16 }>
										<Textarea
											name="body"
											onChange={ handleChange }
											rows={ 24 }
										/>
									</FormField>
									<TextInputField
										label="Total Running KM"
										name="running_km"
										type="number"
										onChange={ handleChange }
									/>
									<TextInputField
										label="Total Running Minutes"
										name="running_minutes"
										type="number"
										onChange={ handleChange }
									/>
									<Button iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty || !values.title } onClick={ handleSubmit }>Add</Button>
									{ errors && <p>{ errors }</p>}
								</form> 
							</>
						);
					}}
			</Formik>
		</> );
}
AddWorkoutPanel.propTypes = {
	props: PropTypes.object,
	emit: PropTypes.func,
};