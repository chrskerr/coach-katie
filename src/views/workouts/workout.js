
// deps
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";
import { Link } from "react-router-dom";

// app
import { Pane, Badge, Button, Heading, Text, Paragraph, Tablist, Tab } from "evergreen-ui";
import { Services, Queries, Loading, constants } from "../index";

//
// Adultletics Admin / Views / Workout / Workout
//


export default function Workout ( props ) {
	const { id } = props;
	const { data, loading } = useQuery( Queries.workouts.getOne, { variables: { id }});
	const { openPanel } = useContext( Services.UI );
	const [ selectedVersion, setSelectedVersion ] = useState();
	const { intensityOptions, workoutTypes } = constants;

	const title = _.get( data, "workouts_by_pk.title" );
	const typesValue = _.get( data, "workouts_by_pk.type" );
	const intensityValue = _.get( data, "workouts_by_pk.intensity" );
	const versions = _.get( data, "workouts_by_pk.versions" );
	useEffect(() => { if ( !selectedVersion ) setSelectedVersion( _.get( _.last( versions ), "version_num" ));}, [ versions ]);

	if ( loading ) return <Loading />;

	const version = _.find( versions, [ "version_num", selectedVersion ]);
	const body = _.get( version, "body" );
	const stats = _.get( version, "stats", {});
	const drills = _.map( _.get( version, "drills", []), "drill" );

	const intensity = _.get( _.find( intensityOptions, [ "value", intensityValue.toString() ]), "label", "" );
	const type = _.get( _.find( workoutTypes, [ "value", typesValue ]), "label", "" );

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<Button marginLeft={ 8 } iconBefore="plus" onClick={ () => openPanel({ panel: "workouts/add-version", props: { id: version.id, workoutId: id }, size: "wide" })}>Add Version</Button>
				<Button marginLeft={ 8 } iconBefore="edit" onClick={ () => openPanel({ panel: "workouts/edit", props: { id: version.id }, size: "wide" })}>Edit</Button>
				<Button marginLeft={ 8 } iconBefore="walk" onClick={ () => openPanel({ panel: "workouts/edit-drills", props: { id: version.id }, size: "wide" })}>Edit Drills</Button>
			</Pane>
			<Pane marginBottom={ 32 } display="flex" flexDirection="row">
				<Pane marginRight={ 16 }>
					<Heading>{ title }</Heading>
				</Pane>
				<Pane flex={ 1 }>
					<Badge marginRight={ 8 } color="blue">{ type }</Badge>
					<Badge color="blue">{ intensity }</Badge>
				</Pane>
			</Pane>
			<Pane display="flex" flexDirection="row" alignItems="center" marginBottom={ 24 }>
				<Text>Versions:</Text>
				<Pane flex={ 1 } marginLeft={ 16 }>
					<Tablist alignItems="center">
						{ versions && _.map( versions, ({ version_num }) => (
							<Tab
								key={ version_num }
								id={ version_num }
								onSelect={ () => setSelectedVersion( version_num ) }
								isSelected={ selectedVersion === version_num }
								aria-controls={ `panel-${ version_num }` }
							>
								{ version_num }
							</Tab>
						))}
					</Tablist>
				</Pane>
			</Pane>
			<Pane background="white" padding={ 32 } marginBottom={ 32 }>
				<Heading size={ 200 }>Description:</Heading>
				<Text>{ body }</Text>
			</Pane>
			<Pane padding={ 32 } marginBottom={ 32 }>
				<Heading size={ 200 }>Drills:</Heading>
				{ !_.isEmpty( drills ) ? _.map( drills, drill => {
					const { id, title } = drill;
					return ( 
						<Link to={ `/drills/${ id }` } key={ id } style={{ marginBottom: "24px" }}>
							<Pane display="flex" elevation={ 1 } height={ 48 } alignItems="center" background="white" marginBottom={ 16 }>
								<Text marginLeft={ 24 }>{ title }</Text> 
							</Pane> 
						</Link>
					);
				}) : <Paragraph>No attached drills</Paragraph> }
			</Pane>
			<Pane background="white" padding={ 32 }>
				<Heading size={ 200 }>Stats:</Heading>
				<Paragraph>Total running kilometers - <strong>{ _.get( stats, "running_km", 0 ) }</strong></Paragraph>
				<Paragraph>Total running minutes - <strong>{ _.get( stats, "running_minutes", 0 ) }</strong></Paragraph>
			</Pane>
		</>
	);
}
Workout.propTypes = {
	id: PropTypes.string,
};
