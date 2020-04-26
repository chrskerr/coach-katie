
// deps
import React, { useContext, useState } from "react";
import { TextInputField, Button } from "evergreen-ui";
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

	return (
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
							<TextInputField
								label="Email"
								type="email"
								name="email"
								onChange={ handleChange }
							/>
							<TextInputField
								label="Password"
								type="password"
								name="password"
								onChange={ handleChange }
							/>
							<Button isLoading={ isAuthenticating || isSubmitting } disabled={ !values.email || !values.password } onClick={ handleSubmit }>Log In</Button>
							{ errors && <p>{ errors }</p>}
						</form> );
				}}
		</Formik>
	);
}




// 		await ;
