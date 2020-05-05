
// deps
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";


// app
import { Services } from "../index";

//
// Adultletics Admin / Views / App / Apollo Provider
//

export default function Apollo ({ children }) {
	const { token } = useContext( Services.Auth );
    
	const httpLink = new HttpLink({
		uri: "https://adultletics-hasura.herokuapp.com/v1/graphql",
		headers: token ? { Authorization: `Bearer ${ token }` } : {},
	});
    
	const wsLink = new WebSocketLink({
		uri: "wss://adultletics-hasura.herokuapp.com/v1/graphql",
		options: {
			reconnect: true,
			timeout: 30000,
			connectionParams: token ? { headers: { Authorization: `Bearer ${ token }` }} : {},
		},
	});

	const link = split(
		({ query }) => {
			const { kind, operation } = getMainDefinition( query );
			return kind === "OperationDefinition" && operation === "subscription";
		},
		wsLink,
		httpLink,
	);

	const client = new ApolloClient({
		link,
		cache: new InMemoryCache(),
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
