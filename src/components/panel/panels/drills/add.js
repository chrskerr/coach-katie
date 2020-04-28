
// deps
import React, { useContext, useState } from "react";
import { Pane, TextInputField, Button, Text, Textarea, FormField } from "evergreen-ui";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";

// app
import { Services, Queries } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Drills / add
//


export default function AddDrillPanel () {
	const [ insertDrill ] = useMutation( Queries.drills.add, { refetchQueries: [{ query: Queries.drills.getAll }], awaitRefetchQueries: true }); 
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );

	return (
		<Formik
			initialValues={{ description: "" }}
			onSubmit={ async data => {
				setErrors( null );
				try {
					await insertDrill({ variables: { objects: [ data ]}});
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
								<TextInputField
									label="Url to include on weekly workout download"
									name="url"
									value={ values.url }
									placeholder="https://youtu.be/nPMB8PZE9F8"
									onChange={ handleChange }
								/>
								<TextInputField
									label="Url to include the video in this Admin Portal (see below on how-to find)"
									name="embed_url"
									value={ values.embed_url }
									placeholder="https://www.youtube-nocookie.com/embed/nPMB8PZE9F8"
									onChange={ handleChange }
								/>
								<FormField label="Workout Description" marginBottom={ 16 }>
									<Textarea
										name="description"
										onChange={ handleChange }
									/>
								</FormField>
								<Button iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty || !values.title || !values.url } onClick={ handleSubmit }>Add</Button>
								{ errors && <p>{ errors }</p>}
							</form> 
							<Pane marginTop={ 24 }>
								<Text>To find embed URL: go to the YouTube page, click on Share just below the video display, click on Embed in the pop-up, then select "Enable privacy-enhanced mode" and finally copy the quoted part of the text following "src=" in the text to the right, should look something like "https://www.youtube-nocookie.com/embed/nPMB8PZE9F8"</Text>
							</Pane>
						</>
					);
				}}
		</Formik>
	);
}
