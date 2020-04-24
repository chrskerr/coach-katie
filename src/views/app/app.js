
// deps
import React, { useState } from "react";

// app
import FirebaseProvider from "./firebase";
import Router from "./router";
import ApolloProvider from "./apollo";
import { Auth } from "./services";

//
// Adultletics Admin / Views / App / App
//


export default function App () {
	const [ auth, setAuth ] = useState({
		authUser: {},
		token: "",
		isAuthenticating: false,
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
