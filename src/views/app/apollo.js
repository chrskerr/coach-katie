
// deps
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

// app
import { Services } from "../index";

//
// Adultletics Admin / Views / App / Apollo Provider
//

export default function Apollo ({ children }) {
	const { token } = useContext( Services.Auth );
    
	const client = new ApolloClient({
		uri: "https://adultletics-hasura.herokuapp.com/v1/graphql",
		headers: token ? { Authorization: `Bearer ${ token }` } : {},
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
