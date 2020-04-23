
// deps
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/auth";
import _ from "lodash";

// app
import { Auth } from "./services";

//
// Pantry / Views / App / Firebase
//


const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp( firebaseConfig );

export default function Firebase ( props ) {
	const { children } = props;
	const [ auth, setAuth ] = useState({
		authUser: {},
		token: "",
		isAuthenticating: false,
		isAuthenticated: false,
		isAdmin: false,
		updateAuth: payload => setAuth( auth => ({ ...auth, ...payload })),
	});
    
	const { updateAuth, authUser } = auth;

	useEffect(() => firebase.auth().onAuthStateChanged( async user => {
		updateAuth({ isAuthenticating: true });
		if ( user ) {
			const token = await user.getIdToken();
			const idTokenResult = await user.getIdTokenResult();
			const hasuraClaim = idTokenResult.claims[ "https://hasura.io/jwt/claims" ];
			if ( hasuraClaim ) {
				updateAuth({ token });
				// get User profile, update authUser with this
			}
		} else { 
			updateAuth({ authUser: {}}); 
		}
		updateAuth({ isAuthenticating: false });
	}), []);

	useEffect(() => { 
		if ( _.isEmpty( authUser )) {
			updateAuth({ isAuthenticated: false, isAdmin: false });
		} else {
			updateAuth({ isAuthenticated: true });
			// check for Admin here
		} 
	}, [ authUser ]);

	console.log( auth.isAuthenticating );

	return (
		<Auth.Provider value={ auth }>
			{ children && children }
		</Auth.Provider>
	);
}
Firebase.propTypes = {
	children: PropTypes.node,
};
