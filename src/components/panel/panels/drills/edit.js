
// deps
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Pane, Heading, TextInputField, Button, Text, Textarea, FormField } from "evergreen-ui";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Services, Queries } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Drills / Edit
//


export default function EditDrillPanel ({ props }) {
	const { id } = props;
	const { data, loading } = useQuery( Queries.drills.getOne, { variables: { id }});
	const [ updateDrill ] = useMutation( Queries.drills.update, { refetchQueries: [{ query: Queries.drills.getOne, variables: { id }}], awaitRefetchQueries: true }); 
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );

	if ( loading ) return null;
    
	const drill = _.get( data, "drills_by_pk" );
	const title = _.get( drill, "title" );
	const url = _.get( drill, "url" );
	const embed_url = _.get( drill, "embed_url" );
	const description = _.get( drill, "description" );
    
	return ( <>
		<Pane marginBottom={ 56 }>
			<Heading size={ 600 }>Editing challenge: { title }</Heading>
		</Pane>
		<Formik
			initialValues={{ title, url, embed_url, description: _.isNull( description ) ? "" : description }}
			onSubmit={ async data => {
				setErrors( null );
				try {
					await updateDrill({ variables: { id, data }});
					closePanel();
				} catch ( error ) {
					console.error( error );
					setErrors( error.message );
				}
			}}
			enableReinitialize={ true }
		>{
				({ values, dirty, handleChange, handleSubmit, isSubmitting }) => {
					return (
						<>
							<form>
								<TextInputField
									label="Title"
									name="title"
									value={ values.title }
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
									label="Url to include on this page (see below on how-to find)"
									name="embed_url"
									value={ values.embed_url }
									placeholder="https://www.youtube-nocookie.com/embed/nPMB8PZE9F8"
									onChange={ handleChange }
								/>
								<FormField label="Workout Description" marginBottom={ 16 }>
									<Textarea
										name="description"
										onChange={ handleChange }
										value={ values.description }
									/>
								</FormField>
								<Button iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty || !values.title || !values.url } onClick={ handleSubmit }>Update</Button>
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
EditDrillPanel.propTypes = {
	props: PropTypes.object,
	id: PropTypes.string,
};
