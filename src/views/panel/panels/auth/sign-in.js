
// deps
import React, { useContext } from "react";
import { TextInputField, Button } from "evergreen-ui";
import { Formik } from "formik";

// app
import { Services } from "../../../index";

//
// Adultletics Admin / Views / Panel / Panels / Auth / Sign In
//


export default function SignInPanel () {
	const { isAuthenticating, signIn } = useContext( Services.Auth );

	return (
		<Formik
			initialValues={{}}
			onSubmit={ async ({ email, password }) => {
				const res = await signIn( email, password );
				console.log( res );
			}}
		>{
				({ values, handleChange, handleSubmit }) => {
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
							<Button isLoading={ isAuthenticating } disabled={ !values.email || !values.password } onClick={ handleSubmit }>Log In</Button>
						</form> );
				}}
		</Formik>
	);
}




// 		await ;
