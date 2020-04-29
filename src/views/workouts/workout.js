
// deps
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import _ from "lodash";
import { Link, useHistory } from "react-router-dom";

// app
import { Pane, Badge, Button, Heading, Text, Paragraph, Tablist, Tab } from "evergreen-ui";
import { Services, Queries, Loading, constants } from "../index";

//
// Adultletics Admin / Views / Workout / Workout
//


export default function Workout ( props ) {
	const { id } = props;
	const { data, loading } = useSubscription( Queries.workouts.subscribe, { variables: { id }});
	const [ removeWorkout ] = useMutation( Queries.workouts.deleteWorkout, { refetchQueries: [{ query: Queries.workouts.getAll }], awaitRefetchQueries: true });
	const [ removeVersion ] = useMutation( Queries.workouts.deleteVersion, { refetchQueries: [{ query: Queries.workouts.getOne, variables: { id }}], awaitRefetchQueries: true });
	const { openPanel } = useContext( Services.UI );
	const [ selectedVersion, setSelectedVersion ] = useState();
	const { intensityOptions, workoutTypes } = constants;
	const history = useHistory();

	const title = _.get( data, "workouts_by_pk.title" );
	const typesValue = _.get( data, "workouts_by_pk.type" );
	const intensityValue = _.get( data, "workouts_by_pk.intensity" );
	const versions = _.get( data, "workouts_by_pk.versions" );
    
	// eslint-disable-next-line
	useEffect(() => { if ( !selectedVersion ) setSelectedVersion( _.get( _.last( versions ), "version_num" ));}, [ versions ]);

	if ( loading ) return <Loading />;

	const version = _.find( versions, [ "version_num", selectedVersion ]);
	const body = _.get( version, "body", "" );
	const stats = _.get( version, "stats", {});
	const drills = _.map( _.get( version, "drills", []), "drill" );

	const intensity = _.get( _.find( intensityOptions, [ "value", intensityValue ]), "label", "" );
	const type = _.get( _.find( workoutTypes, [ "value", typesValue ]), "label", "" );

	const _handleWorkoutDelete = async () => {
		await removeWorkout({ variables: { id }});
		history.push( "/workouts" );
	};
    
	const _handleVersionDelete = async () => {
		await removeVersion({ variables: { id:  _.get( version, "id" ) }});
		setSelectedVersion( _.get( _.last( versions ), "version_num" ));
	};
    
	const _handleVersionAdd = id => setSelectedVersion( _.get( _.find( versions, [ "id", id ]), "version_num" ));

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<Button marginLeft={ 8 } iconBefore="plus" onClick={ () => openPanel({ panel: "workouts/add-version", props: { id: version.id, workoutId: id, emit: _handleVersionAdd }, size: "wide" })}>Add Version</Button>
				<Button marginLeft={ 8 } iconBefore="edit" onClick={ () => openPanel({ panel: "workouts/edit", props: { id: version.id }, size: "wide" })}>Edit</Button>
			</Pane>
			<Pane marginBottom={ 32 } display="flex" flexDirection="row" alignItems="center">
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
			<Pane background="white" padding={ 32 } marginBottom={ 32 } elevation={ 1 }>
				<Heading marginBottom={ 16 } size={ 200 }>Description:</Heading>
				{ body && _.map( body.split( "\n" ), ( line, i ) => line ? <Paragraph key={ i }>{ line }</Paragraph> : <br key={ i } /> )}
			</Pane>
			<Pane marginBottom={ 32 }>
				<Heading size={ 200 } marginBottom={ 16 }>Drills:</Heading>
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
			<Pane background="white" padding={ 32 } elevation={ 1 }>
				<Heading size={ 200 } marginBottom={ 16 }>Stats:</Heading>
				<Paragraph>Total running kilometers - <strong>{ _.get( stats, "running_km", 0 ) }</strong></Paragraph>
				<Paragraph>Total running minutes - <strong>{ _.get( stats, "running_minutes", 0 ) }</strong></Paragraph>
			</Pane>
			<Pane display="flex" justifyContent="flex-end">
				<Button intent="danger" appearance="minimal" onClick={ _handleVersionDelete } marginRight={ 24 }>Delete This Version</Button>
				<Button intent="danger" appearance="minimal" onClick={ _handleWorkoutDelete }>Delete This Workout</Button>
			</Pane>
		</>
	);
}
Workout.propTypes = {
	id: PropTypes.string,
};
