
// deps
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useSubscription } from "@apollo/react-hooks";
import _ from "lodash";
import { format, parseISO } from "date-fns";

// app
import { Pane, Text, Heading, Badge, IconButton } from "evergreen-ui";
import { Queries, Loading, Services } from "../index";

//
// Adultletics Admin / Views / Week / Week
//


export default function Week ( props ) {
	const { id } = props;
	const { data, loading } = useSubscription( Queries.weeks.subscribe, { variables: { id }});
	const { openPanel } = useContext( Services.UI );

	if ( loading ) return <Loading />;

	const week = _.get( data, "weeks[0]" );
	const { title, updated_at, days } = week;


	return (
		<>
			<Pane marginBottom={ 32 } display="flex" flexDirection="row" alignItems="center">
				<Pane marginRight={ 16 }>
					<Heading>{ title }</Heading>
				</Pane>
				<Pane flex={ 1 }>
					<Text>Last updated: <Badge color="blue">{ format( parseISO( updated_at ), "dd MMM yyyy @ h:mm a" ).replace( "@", "at" ) }</Badge></Text>
				</Pane>
			</Pane>
			<Pane display="flex" justifyContent="space-between">
				{ days && _.map( days, day => {
					const { id, day: { title }, workout } = day;
					const workoutTitle = _.get( workout, "workout.title" );
					const workoutVersion = _.get( workout, "version_num" );
					console.log( day );
					return (
						<Pane key={ id } elevation={ 1 } width="12%" background="white" paddingLeft={ 16 } paddingBottom={ 16 }>
							<Pane display="flex" justifyContent="space-between" alignItems="flex-end" marginBottom={ 8 }>
								<Heading size={ 200 }>{ title }</Heading>
								<IconButton icon="small-plus" appearance="minimal" onClick={ () => openPanel({ panel: "weeks/update-workout", props: { id, title }, size:"wide" })} />
							</Pane>
							<Pane paddingRight={ 16 }>
								{ _.isEmpty( workout ) ? 
									<Text color='red'>No workout chosen</Text> : 
									<Text>{ workoutTitle } - v{ workoutVersion }</Text>
								}
							</Pane>
						</Pane>
					);
				})}
			</Pane>
		</>
	);
}
Week.propTypes = {
	id: PropTypes.string,
};
