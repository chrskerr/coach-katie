
// deps
import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";
import { Link } from "react-router-dom";

// app
import { Pane, Heading, Text, Button } from "evergreen-ui";
import { Services, Queries, Loading } from "../index";

//
// Adultletics Admin / Views / Challenges / Challenges
//


export default function Challenges () {
	const { openPanel } = useContext( Services.UI );
	const { data, loading } = useQuery( Queries.dailyChallenges.getAll );
	const daily_challenges = _.get( data, "daily_challenges" );

	if ( loading ) return <Loading />;

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<Button iconBefore="plus" onClick={ () => openPanel({ panel: "daily-challenges/add" })}>Add</Button>
			</Pane>
			<Pane marginBottom={ 16 }>
				<Heading>All Daily Challenges:</Heading>
			</Pane>
			<Pane>
				{ daily_challenges && _.map( daily_challenges, drill => {
					const { id, title } = drill;
					return ( 
						<Link to={ `/challenges/${ id }` } key={ id } style={{ marginBottom: "24px" }}>
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
