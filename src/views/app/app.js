
// deps
import React, { useState } from "react";

// app
import FirebaseProvider from "./firebase";
import Router from "./router";
import ApolloProvider from "./apollo";
import { Services } from "../index";
 
//
// Adultletics Admin / Views / App / App
//


export default function App () {
	const { Auth } = Services;
	const [ auth, setAuth ] = useState({
		authUser: {},
		token: "",
		uid: "",
		isAuthenticating: true,
		isAuthenticated: false,
		updateAuth: payload => setAuth( auth => ({ ...auth, ...payload })),
		signIn: () => {},
		signOut: () => {},
	});
    
	return (
		<div className="App">
			<Auth.Provider value={ auth }>
				<ApolloProvider>
					<FirebaseProvider>
						<Router />
					</FirebaseProvider>
				</ApolloProvider>
			</Auth.Provider>
		</div>
	);
}
