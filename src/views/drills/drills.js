
// deps
import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";
import { Link } from "react-router-dom";

// app
import { Pane, Card, Heading, Text, Button } from "evergreen-ui";
import { Services, Queries, Loading } from "../index";

//
// Adultletics Admin / Views / Drills / Drills
//


export default function Drills () {
	const { openPanel } = useContext( Services.UI );
	const { data, loading } = useQuery( Queries.drills.getDrills );
	const drills = _.get( data, "drills" );

	if ( loading ) return <Loading />;

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<Button iconBefore="plus" onClick={ () => openPanel({ panel: "drills/add" })}>Add</Button>
			</Pane>
			<Pane marginBottom={ 16 }>
				<Heading>All Drills:</Heading>
			</Pane>
			<Pane>
				{ drills && _.map( drills, drill => {
					const { id, title } = drill;
					return ( 
						<Link to={ `/drills/${ id }` } key={ id } style={{ marginBottom: "24px" }}>
							<Card display="flex" elevation={ 2 } height={ 48 } alignItems="center" background="white" marginBottom={ 16 }>
								<Text marginLeft={ 24 }>{ title }</Text> 
							</Card> 
						</Link>
					);
				})}
			</Pane>
		</>
	);
}
