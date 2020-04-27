
// deps
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Pane, TextInputField, Button, Text } from "evergreen-ui";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Services, Queries } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Drills / add
//


export default function EditDrillPanel ({ props }) {
	const { id } = props;
	const { data, loading } = useQuery( Queries.drills.getDrillById, { variables: { id }});
	const [ updateDrill ] = useMutation( Queries.drills.updateDrill, { refetchQueries: [{ query: Queries.drills.getDrillById, variables: { id }}], awaitRefetchQueries: true }); 
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );

	if ( loading ) return null;
    
	const drill = _.get( data, "drills_by_pk" );
	const title = _.get( drill, "title" );
	const url = _.get( drill, "url" );
    
	return (
		<Formik
			initialValues={{ title, url }}
			onSubmit={ async data => {
				setErrors( null );
				console.log( data );
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
									label="Url, must be the embed URL from youtube"
									name="url"
									value={ values.url }
									placeholder="https://www.youtube-nocookie.com/embed/nPMB8PZE9F8"
									onChange={ handleChange }
								/>
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
	);
}
EditDrillPanel.propTypes = {
	props: PropTypes.object,
	id: PropTypes.string,
};
