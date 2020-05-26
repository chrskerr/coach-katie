
// deps
import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";
import { Link } from "react-router-dom";

// app
import { Pane, Heading, Text, Button } from "evergreen-ui";
import { Services, Queries, Loading } from "../index";

//
// Adultletics Admin / Views / Drills / Drills
//


export default function Drills () {
	const { openPanel } = useContext( Services.UI );
	const { data, loading } = useQuery( Queries.drills.getAll );
	const drills = _.get( data, "drills" );

	if ( loading ) return <Loading />;

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<button className="alt small" iconBefore="plus" onClick={ () => openPanel({ panel: "drills/add" })}>Add</button>
			</Pane>
			<Pane marginBottom={ 16 }>
				<h3>All Drills:</h3>
			</Pane>
			<Pane>
				{ drills && _.map( drills, drill => {
					const { id, title } = drill;
					return ( 
						<Link to={ `/admin/drills/${ id }` } key={ id } style={{ marginBottom: "24px" }}>
							<Pane className="c-row-hover" display="flex" elevation={ 1 } height={ 48 } alignItems="center" background="white" marginBottom={ 16 }>
								<Text marginLeft={ 24 }>{ title }</Text> 
							</Pane> 
						</Link>
					);
				})}
			</Pane>
		</>
	);
}
