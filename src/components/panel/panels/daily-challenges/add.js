
// deps
import React, { useContext, useState } from "react";
import { Pane, Heading, TextInputField, Button, Textarea, FormField } from "evergreen-ui";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";

// app
import { Services, Queries } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Challenges / Add
//


export default function AddDailyChallengePanel () {
	const [ insertChallenge ] = useMutation( Queries.dailyChallenges.add, { refetchQueries: [{ query: Queries.dailyChallenges.getAll }], awaitRefetchQueries: true }); 
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );

	return ( <>
		<Pane marginBottom={ 56 }>
			<Heading size={ 600 }>Adding a new daily challenge</Heading>
		</Pane>
		<Formik
			initialValues={{ description: "" }}
			onSubmit={ async data => {
				setErrors( null );
				try {
					await insertChallenge({ variables: { objects: [ data ]}});
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
									label="Title"
									name="title"
									onChange={ handleChange }
									autoFocus
								/>
								<FormField label="Description" marginBottom={ 16 }>
									<Textarea
										name="description"
										onChange={ handleChange }
									/>
								</FormField>
								<Button iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty || !values.title || !values.description } onClick={ handleSubmit }>Add</Button>
								{ errors && <p>{ errors }</p>}
							</form> 
						</>
					);
				}}
		</Formik>
	</> );
}
