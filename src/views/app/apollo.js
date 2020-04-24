
// deps
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

// app
import { Auth } from "./services";

//
// Adultletics Admin / Views / App / Apollo Provider
//

export default function Apollo ({ children }) {
	const { token } = useContext( Auth );
	console.log( token );

	const client = new ApolloClient({
		uri: "https://adultletics-hasura.herokuapp.com/v1/graphql",
		headers: { 
			Authorization: token ? `Bearer ${ token }` : "", 
		}, 
	});
    
	return (
		<ApolloProvider client={ client }>
			{ children }
		</ApolloProvider>
	);
}
Apollo.propTypes = {
	children: PropTypes.node,
};
