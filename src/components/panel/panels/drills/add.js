
// deps
import React, { useContext, useState } from "react";
import { Pane, Heading, TextInputField, Button, Text, Textarea, FormField } from "evergreen-ui";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import _ from "lodash";
import { useHistory } from "react-router-dom";

// app
import { Services, Queries } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Drills / Add
//


export default function AddDrillPanel () {
	const [ insertDrill ] = useMutation( Queries.drills.add, { refetchQueries: [{ query: Queries.drills.getAll }], awaitRefetchQueries: true }); 
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const history = useHistory();

	return ( <>
		<Pane marginBottom={ 56 }>
			<Heading size={ 600 }>Adding a new drill</Heading>
		</Pane>
		<Formik
			initialValues={{ description: "" }}
			onSubmit={ async data => {
				setErrors( null );
				try {
					const res = await insertDrill({ variables: { objects: [ data ]}});
					closePanel();
					const id = _.get( res, "data.insert_drills.returning[0].id" );
					history.push( `/admin/drills/${ id }` );
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
	</> );
}
