
// deps
import React, { useContext, useState } from "react";
import { TextInputField, Textarea, FormField, Button } from "evergreen-ui";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";

// app
import { Services, Queries } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Workouts / add
//


export default function AddWorkoutPanel () {
	const [ addWorkout ] = useMutation( Queries.workouts.addWorkout, { refetchQueries: [{ query: Queries.workouts.getAll }], awaitRefetchQueries: true }); 
	const { authUser } = useContext( Services.Auth );
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );

	return (
		<Formik
			initialValues={{ running_km: 0, running_minutes: 0 }}
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
				({ values, dirty, handleChange, handleSubmit, isSubmitting }) => {
					return (
						<>
							<form>
								<TextInputField
									label="Workout Title"
									name="title"
									onChange={ handleChange }
									autoFocus
								/>
								<FormField label="Workout Description">
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
