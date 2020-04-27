
// deps
import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import _ from "lodash";

// app
import { Badge, Pane, Text, Heading, Button } from "evergreen-ui";
import { Services, Queries, Loading, constants } from "../index";

//
// Adultletics Admin / Views / Workouts / Workouts
//


export default function Workouts () {
	const { openPanel } = useContext( Services.UI );
	const { data, loading } = useQuery( Queries.workouts.getAll );
	const workouts = _.get( data, "workouts" );
	const { intensityOptions, workoutTypes } = constants;

	if ( loading ) return <Loading />;

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<Button iconBefore="plus" onClick={ () => openPanel({ panel: "workouts/add", size: "wide" })}>Add</Button>
			</Pane>
			<Pane marginBottom={ 16 }>
				<Heading>All Workouts:</Heading>
			</Pane>
			<Pane>
				{ workouts && _.map( workouts, workout => {
					const { id, title, intensity, type } = workout;
					const intensityLabel = _.get( _.find( intensityOptions, [ "value", intensity ]), "label", "" );
					const typeLabel = _.get( _.find( workoutTypes, [ "value", type ]), "label", "" );
					return ( 
						<Link to={ `/workouts/${ id }` } key={ id } style={{ marginBottom: "24px", width: "100%" }}>
							<Pane display="flex" elevation={ 1 } height={ 48 } alignItems="center" background="white" marginBottom={ 16 } >
								<Pane flex={ 1 } >
									<Text marginLeft={ 24 } marginRight={ 8 }>{ title }</Text> 
									<Badge marginRight={ 8 } color="blue">{ typeLabel }</Badge>
									<Badge color="blue">{ intensityLabel }</Badge>
								</Pane> 
							</Pane>
						</Link>

					);
				})}
			</Pane>
		</>
	);
}
