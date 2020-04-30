
// deps
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Button, Pane, Heading, Text, Paragraph } from "evergreen-ui";
import { Services, Queries, Loading } from "../index";

//
// Adultletics Admin / Views / Challenges / Challenge
//


export default function Challenge ( props ) {
	const { openPanel } = useContext( Services.UI );
	const { id } = props;
	const { data, loading } = useQuery( Queries.dailyChallenges.getOne, { variables: { id }});

	if ( loading ) return <Loading />;

	const challenge = _.get( data, "daily_challenges_by_pk", {});
	const title = _.get( challenge, "title" );
	const description = _.get( challenge, "description" );
	const weeks = _.get( challenge, "workouts_drills", []);
	const weeksCount = _.size( weeks );

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<Button iconBefore="edit" onClick={ () => openPanel({ panel: "daily-challenges/edit", props: { id }})}>Edit</Button>
			</Pane>
			<Pane marginBottom={ 32 } display="flex">
				<Heading marginRight={ 16 }>{ title }</Heading>
			</Pane>
			<Pane display="flex">
				<Pane flex={ 1 } marginRight={ 32 } >
					{ description && 
						<Pane background="white" padding={ 32 }  marginBottom={ 32 } elevation={ 1 }>
							<Paragraph>{ description }</Paragraph>
						</Pane> 
					}
					<Pane background="white" padding={ 32 }  marginBottom={ 32 } elevation={ 1 }>
						<Text>Appears in <strong>{ weeksCount }</strong> weeks</Text>
					</Pane>
				</Pane>
			</Pane>
		</>
	);
}
Challenge.propTypes = {
	id: PropTypes.string,
};
