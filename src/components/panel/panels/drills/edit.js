
// deps
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Pane, TextInputField, Textarea, FormField } from "evergreen-ui";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Services, Queries } from "../index";

//
// Adultletics / Views / Panel / Panels / Drills / Edit
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
			<h2 size={ 600 }>Editing challenge: { title }</h2>
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
						<form>
							<div className="row uniform">
								<div className="12u$">
									<TextInputField
										label="Title"
										name="title"
										value={ values.title }
										onChange={ handleChange }
										autoFocus
									/>
								</div>
								<div className="12u$">
									<TextInputField
										label="Url"
										name="url"
										value={ values.url }
										placeholder="https://youtu.be/nPMB8PZE9F8"
										onChange={ handleChange }
									/>
								</div>
								<div className="12u$">
									<FormField label="Workout Description" marginBottom={ 16 }>
										<Textarea
											name="description"
											onChange={ handleChange }
											value={ values.description }
											rows={ 8 }
										/>
									</FormField>
								</div>
								<div className="12u$">
									<button className="special" iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty || !values.title || !values.url } onClick={ handleSubmit }>Update</button>
								</div>
								{ errors && <p>{ errors }</p> }
							</div>
						</form> 
					);
				}}
		</Formik>
	</> );
}
EditDrillPanel.propTypes = {
	props: PropTypes.object,
	id: PropTypes.string,
};
