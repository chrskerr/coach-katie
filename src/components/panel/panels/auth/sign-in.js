
// deps
import React, { useContext, useState } from "react";
import { TextInputField, Pane } from "evergreen-ui";
import { Formik } from "formik";

// app
import { Services } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Auth / Sign In
//


export default function SignInPanel () {
	const { isAuthenticating, signIn } = useContext( Services.Auth );
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );

	return ( <>
		<Pane marginBottom={ 56 }>
			<h2>Sign In</h2>
		</Pane>
		<Formik
			initialValues={{}}
			onSubmit={ async ({ email, password }) => {
				setErrors( null );
				try {
					await signIn( email, password );
					closePanel();
				} catch ( error ) {
					console.error( error );
					setErrors( error.message );
				}
			}}
		>{
				({ values, handleChange, handleSubmit, isSubmitting }) => {
					return (
						<form>
							<div className="row uniform">
								<div className="12u$">
									<TextInputField
										label="Email"
										type="email"
										name="email"
										onChange={ handleChange }
										autoFocus
									/>
								</div>
								<div className="12u$">
									<TextInputField
										label="Password"
										type="password"
										name="password"
										onChange={ handleChange }
									/>
								</div>
								<div className="12u$">
									<button className="special" isLoading={ isAuthenticating || isSubmitting } disabled={ !values.email || !values.password } onClick={ handleSubmit }>Log In</button>
								</div>
								{ errors && <p>{ errors }</p>}
							</div>
						</form> 
					);
				}}
		</Formik>
	</> );
}
