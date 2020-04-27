
// deps
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Radio, Select, TextInputField, Textarea, FormField, Button, Pane } from "evergreen-ui";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import _ from "lodash";
import { useHistory } from "react-router-dom";

// app
import { Services, Queries, constants } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Workouts / Add
//



export default function AddWorkoutPanel ({ props }) {
	const { emit } = props;
	const [ addVersion ] = useMutation( Queries.workouts.addVersion, { refetchQueries: [{ query: Queries.workouts.getAll }], awaitRefetchQueries: true }); 
	const { authUser } = useContext( Services.Auth );
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const { intensityOptions, workoutTypes } = constants;
	const history = useHistory();

	return (
		<Formik
			initialValues={{ running_km: 0, running_minutes: 0, intensity: "3" }}
			onSubmit={ async ({ title, body, running_km, running_minutes, intensity, type }) => {
				setErrors( null );
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

					}]}});
					closePanel();
					const id = _.get( res, "data.insert_workouts_versions.returning[0].id" );
					if ( emit ) emit( id );
					history.push( `/workouts/${ id }` );
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
	);
}
AddWorkoutPanel.propTypes = {
	props: PropTypes.object,
	emit: PropTypes.func,
};