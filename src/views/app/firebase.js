
// deps
import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/auth";
import _ from "lodash";
import { useApolloClient } from "@apollo/react-hooks";

// app
import { Queries, Services } from "../index";

//
// Adultletics Admin / Views / App / Firebase
//


const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

firebase.initializeApp( firebaseConfig );

export default function Firebase ({ children }) {
	const apolloClient = useApolloClient();
	const { updateAuth, authUser, isAuthenticating, isAuthenticated } = useContext( Services.Auth );

	useEffect(() => {
		updateAuth({ 
			signIn: async ( email, password ) => await firebase.auth().signInWithEmailAndPassword( email, password ), 
			signOut: () => firebase.auth().signOut(),
		});
        
		firebase.auth().onAuthStateChanged( async user => {
			updateAuth({ isAuthenticating: true });
			if ( user ) {
				const token = await user.getIdToken();
				if ( token ) await updateAuth({ token });
				const idTokenResult = await user.getIdTokenResult();
				const hasuraClaim = idTokenResult.claims[ "https://hasura.io/jwt/claims" ];
				if ( hasuraClaim ) {
					setTimeout( async () => {
						const userRes = await apolloClient.query({ query: Queries.auth.getUser, variables: { uid: user.uid }});
						console.log( userRes );
						const authUser = _.get( userRes, "data.users_by_pk" );
						updateAuth({ isAuthenticated: true, authUser });
					}, 1000 );
				} else {
					updateAuth({ token: {}});
				}
			} else { 
				updateAuth({ authUser: {}}); 
			}
			updateAuth({ isAuthenticating: false });
		});
	}, []);

	useEffect(() => { 
		if ( _.isEmpty( authUser ) && isAuthenticated !== false ) updateAuth({ isAuthenticated: false });
		if ( !_.isEmpty( authUser ) && isAuthenticated !== true ) updateAuth({ isAuthenticated: true });
	}, [ authUser ]);

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
