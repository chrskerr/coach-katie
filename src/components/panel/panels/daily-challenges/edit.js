
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
// Adultletics / Views / Panel / Panels / Challenges / Edit
//


export default function EditDailyChallengePanel ({ props }) {
	const { id } = props;
	const { data, loading } = useQuery( Queries.dailyChallenges.getOne, { variables: { id }});
	const [ updateChallenge ] = useMutation( Queries.dailyChallenges.update, { refetchQueries: [{ query: Queries.dailyChallenges.getOne, variables: { id }}], awaitRefetchQueries: true }); 
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );

	if ( loading ) return null;
    
	const challenge = _.get( data, "daily_challenges_by_pk" );
	const title = _.get( challenge, "title" );
	const description = _.get( challenge, "description", "" );
    
	return ( <>
		<Pane marginBottom={ 56 }>
			<h2>Editing challenge: { title }</h2>
		</Pane>
		<Formik
			initialValues={{ title, description: _.isNull( description ) ? "" : description }}
			onSubmit={ async data => {
				setErrors( null );
				try {
					await updateChallenge({ variables: { id, data }});
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
									<FormField label="Description" marginBottom={ 16 }>
										<Textarea
											name="description"
											onChange={ handleChange }
											value={ values.description }
											rows={ 8 }
										/>
									</FormField>
								</div>
								<div className="12u$">
									<button className="special" iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty || !values.title || !values.description } onClick={ handleSubmit }>Update</button>
								</div>
								{ errors && <p>{ errors }</p>}
							</div>
						</form> 
					);
				}}
		</Formik>
	</> );
}
EditDailyChallengePanel.propTypes = {
	props: PropTypes.object,
	id: PropTypes.string,
};
