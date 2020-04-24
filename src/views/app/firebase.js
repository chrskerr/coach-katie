
// deps
import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/auth";
import _ from "lodash";
import { useApolloClient } from "@apollo/react-hooks";

// app
import { Auth } from "./services";
import { Queries } from "../index";

//
// Adultletics Admin / Views / App / Firebase
//

console.log( Queries );

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

firebase.initializeApp( firebaseConfig );

export default function Firebase ({ children }) {
	const apolloClient = useApolloClient();
	const { updateAuth, authUser, isAuthenticating } = useContext( Auth );
    
	useEffect(() => firebase.auth().onAuthStateChanged( async user => {
		updateAuth({ isAuthenticating: true });
		if ( user ) {
			const token = await user.getIdToken();
			const idTokenResult = await user.getIdTokenResult();
			const uid = user.uid;
			const hasuraClaim = idTokenResult.claims[ "https://hasura.io/jwt/claims" ];
			if ( hasuraClaim ) {
				updateAuth({ token });
				const userRes = await apolloClient( Queries.auth.getUser, { variables: { uid }});
				console.log( userRes );
			}
		} else { 
			updateAuth({ authUser: {}}); 
		}
		updateAuth({ isAuthenticating: false });
	}), []);

	useEffect(() => { 
		if ( _.isEmpty( authUser )) {
			updateAuth({ isAuthenticated: false });
		} else {
			updateAuth({ isAuthenticated: true });
		} 
	}, [ authUser ]);
    
	useEffect(() => {
		updateAuth({ 
			signIn: async ( email, password ) => await firebase.auth().signInWithEmailAndPassword( email, password ), 
			signOut: () => firebase.auth().signOut(),
		});
	}, [ firebase ]);

	console.log( "isAuthenticating", isAuthenticating );

	return (
		<>
			{ children && children }
		</>
	);
}
Firebase.propTypes = {
	children: PropTypes.node,
};
