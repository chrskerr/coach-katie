
// deps
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

// app
import { Auth } from "./services";

//
// Pantry / Views / App / Apollo Provider
//


export default function Apollo ({ children }) {
	const { token, isAuthenticated } = useContext( Auth );

	const client = new ApolloClient({
		uri: "https://pantry-hasura-service.herokuapp.com/v1/graphql",
		headers: isAuthenticated 
			? { Authorization: `Bearer ${ token }` } 
			: {},
	});

	// const [ modal, setModal ] = useState( false );
	// const [ formData, setFormData ] = useState({});
	// const [ loginError, setLoginError ] = useState();
	// const [ loading, setLoading ] = useState( false );

	// const handleLogin = async e => {
	// 	e.preventDefault();
	// 	setLoginError( false );
	// 	const { email, password } = formData;

	// 	try {	
	// 		setLoading( true );
	// 		await firebase.auth().signInWithEmailAndPassword( email, password );
	// 		setFormData({});
	// 		setModal( false );
	// 		setAuthState( true );
	// 	} 
	// 	catch ( err ) {
	// 		setLoginError( err );
	// 		setFormData({ ...formData, password: "" });

	// 	} 
	// 	finally {
	// 		setLoading( false );
	// 	}
	// };

	// const logOut = () => {
	// 	firebase.auth().signOut();
	// 	setAuthState( false );
	// };

	return (
		<ApolloProvider client={ client }>
			{ children }
		</ApolloProvider>
	);
}
Apollo.propTypes = {
	children: PropTypes.node,
};