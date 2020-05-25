
// deps
import React, { useContext, useState } from "react";
import { Pane, TextInputField, Textarea, FormField } from "evergreen-ui";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import _ from "lodash";

// app
import { Services, Queries } from "../index";

//
// Adultletics / Views / Panel / Panels / Challenges / Add
//


export default function AddDailyChallengePanel () {
	const [ insertChallenge ] = useMutation( Queries.dailyChallenges.add, { refetchQueries: [{ query: Queries.dailyChallenges.getAll }], awaitRefetchQueries: true }); 
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const history = useHistory();

	return ( <>
		<Pane marginBottom={ 56 }>
			<h2>Add a new Daily Challenge</h2>
		</Pane>
		<Formik
			initialValues={{ description: "" }}
			onSubmit={ async data => {
				setErrors( null );
				try {
					const res = await insertChallenge({ variables: { objects: [ data ]}});
					closePanel();
					const id = _.get( res, "data.insert_challenges.returning[0].id" );
					history.push( `/admin/challenges/${ id }` );
				} catch ( error ) {
					console.error( error );
					setErrors( error.message );
				}
			}}
		>{
				({ values, dirty, handleChange, handleSubmit, isSubmitting }) => {
					return (
						<form>
							<div className="row uniform">
								<div className="12u$">
									<TextInputField
										label="Title"
										name="title"
										onChange={ handleChange }
										autoFocus
									/>
								</div>
								<div className="12u$">
									<FormField label="Description" marginBottom={ 16 }>
										<Textarea
											name="description"
											onChange={ handleChange }
										/>
									</FormField>
								</div>
								<div className="12u$">
									<button className="special" iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty || !values.title || !values.description } onClick={ handleSubmit }>Add</button>
									{ errors && <p>{ errors }</p>}
								</div>
							</div>
						</form> 
					);
				}}
		</Formik>
	</> );
}
