
// deps
import React from "react";
import PropTypes from "prop-types";
import { Badge, Text, Pane, Paragraph } from "evergreen-ui";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Loading, Queries, constants } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Weeks / View Workout Version
//


export default function ViewWorkoutVersionPanel ({ props }) {
	const { id } = props;
	const { intensityOptions, workoutTypes } = constants;
	const { data, loading } = useQuery( Queries.workouts.getVersion, { variables: { id }});

	if ( loading ) return <Loading />;
    
	const version = _.get( data, "workouts_versions_by_pk" );
    
	const version_num = _.get( version, "version_num" );
	const body = _.get( version, "body" );
	const drills = _.map( _.get( version, "drills", []), "drill" );
	const workout = _.get( version, "workout" );
	const title = _.get( workout, "title" );
	const typesValue = _.get( workout, "type" );
	const intensityValue = _.get( workout, "intensity" );
    
	const intensity = _.get( _.find( intensityOptions, [ "value", intensityValue ]), "label", "" );
	const type = _.get( _.find( workoutTypes, [ "value", typesValue ]), "label", "" );

	return ( <>
		<Pane marginBottom={ 32 } display="flex" flexDirection="row" alignItems="center">
			<Pane marginRight={ 16 }>
				<h3>{ title } - version { version_num }</h3>
			</Pane>
			<Pane flex={ 1 }>
				<Badge marginRight={ 8 } color="blue">{ type }</Badge>
				<Badge color="blue">{ intensity }</Badge>
			</Pane>
		</Pane>
		<Pane background="white" padding={ 32 } marginBottom={ 32 } elevation={ 1 }>
			<h4>Description:</h4>
			{ body && _.map( body.split( "\n" ), ( line, i ) => line ? <Paragraph key={ i }>{ line }</Paragraph> : <br key={ i } /> )}
		</Pane>
		<Pane marginBottom={ 32 }>
			<h4>Drills:</h4>
			{ !_.isEmpty( drills ) ? _.map( drills, drill => {
				const { id, title } = drill;
				return ( 
					<Link to={ `/admin/drills/${ id }` } key={ id } style={{ marginBottom: "24px" }}>
						<Pane display="flex" elevation={ 1 } height={ 48 } alignItems="center" background="tint" marginBottom={ 16 }>
							<Text marginLeft={ 24 }>{ title }</Text> 
						</Pane> 
					</Link>
				);
			}) : <Paragraph>No attached drills</Paragraph> }
		</Pane>
	</> );
}
ViewWorkoutVersionPanel.propTypes = {
	props: PropTypes.object,
	id: PropTypes.string,
};
