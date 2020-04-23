
// deps
import React from "react";

// app
import FirebaseProvider from "./firebase";
import Router from "./router";
import ApolloProvider from "./apollo";

//
// Pantry / Views / App / App
//


export default function App () {
	return (
		<div className="App">
			<FirebaseProvider>
				<ApolloProvider>
					<Router />
				</ApolloProvider>
			</FirebaseProvider>
		</div>
	);
}
