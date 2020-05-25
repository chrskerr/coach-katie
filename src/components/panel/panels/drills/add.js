
// deps
import React, { useContext, useState } from "react";
import { Pane, TextInputField, Textarea, FormField } from "evergreen-ui";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import _ from "lodash";
import { useHistory } from "react-router-dom";

// app
import { Services, Queries } from "../index";

//
// Adultletics / Views / Panel / Panels / Drills / Add
//


export default function AddDrillPanel () {
	const [ insertDrill ] = useMutation( Queries.drills.add, { refetchQueries: [{ query: Queries.drills.getAll }], awaitRefetchQueries: true }); 
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const history = useHistory();

	return ( <>
		<Pane marginBottom={ 56 }>
			<h2 size={ 600 }>Adding a new drill</h2>
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
									<TextInputField
										label="Url"
										name="url"
										value={ values.url }
										placeholder="https://youtu.be/nPMB8PZE9F8"
										onChange={ handleChange }
									/>
								</div>
								<div className="12u$">
									<label label="Workout Description" />
									<Textarea
										name="description"
										onChange={ handleChange }
										rows={ 8 }
									/>
								</div>
								<div className="12u$">
									<button className="special" iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty || !values.title || !values.url } onClick={ handleSubmit }>Add</button>
								</div>
								{ errors && <p>{ errors }</p> }
							</div>
						</form> 
					);
				}}
		</Formik>
	</> );
}
