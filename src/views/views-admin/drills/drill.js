
// deps
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Button, Pane, Heading, Text, Paragraph, Link } from "evergreen-ui";
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
	const description = _.get( drill, "description" );
	const url = _.get( drill, "url" );
	const embed_url = `https://www.youtube.com/embed/${ _.trim( url ).substring( _.size( url ) - 11, _.size( url )) }`;
	const workouts = _.get( drill, "workouts_drills", []);
	const workoutsCount = _.size( workouts );

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<Button iconBefore="edit" onClick={ () => openPanel({ panel: "drills/edit", props: { id }})}>Edit</Button>
			</Pane>
			<Pane marginBottom={ 32 } display="flex">
				<Heading marginRight={ 16 }>{ title }</Heading>
				{ url && <Link href={ url } target="_blank" rel="noreferrer noopener">{ url }</Link> }
			</Pane>
			<Pane display="flex">
				<Pane flex={ 1 } marginRight={ 32 } >
					{ description && 
						<Pane background="white" padding={ 32 }  marginBottom={ 32 } elevation={ 1 }>
							<Paragraph>{ description }</Paragraph>
						</Pane> 
					}
					<Pane background="white" padding={ 32 }  marginBottom={ 32 } elevation={ 1 }>
						<Text>Appears in <strong>{ workoutsCount }</strong> workouts</Text>
					</Pane>
				</Pane>
				{ embed_url && <Pane elevation={ 1 } height={ 315 } width={ 560 }>
					<iframe width="560" height="315" src={ embed_url } title={ title } frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				</Pane> }
			</Pane>
		</>
	);
}
Drill.propTypes = {
	id: PropTypes.string,
};
