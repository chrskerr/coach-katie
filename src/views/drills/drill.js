
// deps
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Button, Pane, Heading, Card, Text } from "evergreen-ui";
import { Services, Queries, Loading } from "../index";

//
// Adultletics Admin / Views / Drills / Drill
//


export default function Drill ( props ) {
	const { openPanel } = useContext( Services.UI );
	const { id } = props;
	const { data, loading } = useQuery( Queries.drills.getOne, { variables: { id }});

	if ( loading ) return <Loading />;

	const drill = _.get( data, "drills_by_pk", {});
	const title = _.get( drill, "title" );
	const url = _.get( drill, "url" );
	const workouts = _.get( drill, "workouts_drills", []);
	const workoutsCount = _.size( workouts );

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<Button iconBefore="edit" onClick={ () => openPanel({ panel: "drills/edit", props: { id }})}>Edit</Button>
			</Pane>
			<Pane marginBottom={ 32 }>
				<Heading>{ title }</Heading>
			</Pane>
			<Pane display="flex">
				<Card flex={ 1 } background="white" padding={ 32 } marginRight={ 32 } elevation={ 1 }>
					<Text>Appears in <strong>{ workoutsCount }</strong> workouts</Text>
				</Card>
				<Pane elevation={ 1 } height={ 315 } width={ 560 }>
					<iframe width="560" height="315" src={ url } title={ title } frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				</Pane>
			</Pane>
		</>
	);
}
Drill.propTypes = {
	id: PropTypes.string,
};
