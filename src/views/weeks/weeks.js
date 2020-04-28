
// deps
import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import _ from "lodash";

// app
import { Pane, Text, Heading, Button } from "evergreen-ui";
import { Services, Queries, Loading } from "../index";

//
// Adultletics Admin / Views / Weeks / Weeks
//


export default function Weeks () {
	const { openPanel } = useContext( Services.UI );
	const { data, loading } = useQuery( Queries.weeks.getAll );
	const weeks = _.get( data, "weeks" );

	if ( loading ) return <Loading />;

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<Button iconBefore="plus" onClick={ () => openPanel({ panel: "weeks/add" })}>Add</Button>
			</Pane>
			<Pane marginBottom={ 16 }>
				<Heading>All Weeks:</Heading>
			</Pane>
			<Pane>
				{ weeks && _.map( weeks, workout => {
					const { id, title } = workout;
					return ( 
						<Link to={ `/weeks/${ id }` } key={ id } style={{ marginBottom: "24px" }}>
							<Pane display="flex" elevation={ 1 } height={ 48 } alignItems="center" background="white" marginBottom={ 16 }>
								<Text marginLeft={ 24 }>{ title }</Text> 
							</Pane> 
						</Link>
					);
				})}
			</Pane>
		</>
	);
}
