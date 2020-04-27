
// deps
import React, { useContext, useState } from "react";
import { Radio, Select, TextInputField, Textarea, FormField, Button, Pane } from "evergreen-ui";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Services, Queries, constants } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Workouts / Add
//



export default function AddWorkoutPanel () {
	const [ addWorkout ] = useMutation( Queries.workouts.addWorkout, { refetchQueries: [{ query: Queries.workouts.getAll }], awaitRefetchQueries: true }); 
	const { authUser } = useContext( Services.Auth );
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const { intensityOptions, workoutTypes } = constants;

	return (
		<Formik
			initialValues={{ running_km: 0, running_minutes: 0, intensity: "3" }}
			onSubmit={ async ({ title, body, running_km, running_minutes }) => {
				setErrors( null );
				try {
					await addWorkout({ variables: { objects: [{
						title,
						versions: {
							data: {
								version_num: 1,
								_owner: authUser.id,
								body,
								stats: {
									data: {
										running_km, running_minutes,
									},
								},
							},
						},
					}]}});
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
									label="Workout Title"
									name="title"
									onChange={ handleChange }
									autoFocus
								/>
								<FormField label="Workout Intensity" value={ values.intensity } onChange={ e => setFieldValue( "intensity", parseInt( e.target.value )) } marginBottom={ 16 }>
									<Pane display="flex" flexDirection="row" justifyContent="space-between">
										{ _.map( intensityOptions, ({ label, value }) => (
											<Radio key={ value } name="intensity" value={ value } label={ label } />
										))}
									</Pane>
								</FormField>
								<FormField label="Workout Type" marginBottom={ 16 }>
									<Select name="type" value={ values.type } onChange={ handleChange } height={ 32 } >
										<option key="empty" value="">Please select an option...</option>
										{ workoutTypes && _.map( workoutTypes, ({ value, label }) => ( <option key={ value } value={ value }>{ label }</option> ))}
									</Select>
								</FormField>
								<FormField label="Workout Description" marginBottom={ 16 }>
									<Textarea
										name="body"
										onChange={ handleChange }
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
	);
}
