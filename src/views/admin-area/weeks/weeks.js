
// deps
import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import _ from "lodash";
import { differenceInCalendarDays, parseISO } from "date-fns";

// app
import { Pane, Text, Heading, Button, Badge } from "evergreen-ui";
import { Services, Queries, Loading } from "../index";

//
// Adultletics Admin / Views / Weeks / Weeks
//


const now = new Date();

export default function Weeks () {
	const { openPanel } = useContext( Services.UI );
	const { data, loading } = useQuery( Queries.weeks.getAll );
	const weeks = [ ..._.get( data, "weeks", []) ].sort(( a, b ) => parseISO( b.week_start ) - parseISO( a.week_start ));

	if ( loading ) return <Loading />;

	return (
		<>
			<Pane display="flex" justifyContent="flex-end">
				<Button iconBefore="plus" onClick={ () => openPanel({ panel: "weeks/add" })}>Add</Button>
			</Pane>
			<Pane marginBottom={ 16 }>
				<Heading>All Weeks:</Heading>
			</Pane>
			<Pane marginBottom={ 40 }>
				{ weeks && _.map( weeks, workout => {
					const { id, title, week_start } = workout;
					const age = differenceInCalendarDays( now, parseISO( week_start ));
					const background = age >= 7 ? "#FEF6F6" : "white";
					return ( 
						<Link to={ `/admin/weeks/${ id }` } key={ id } style={{ marginBottom: "24px" }}>
							<Pane className="c-row-hover" display="flex" elevation={ 1 } height={ 48 } alignItems="center" background={ background } marginBottom={ 16 }>
								<Text marginLeft={ 24 } marginRight={ 16 }>{ title }</Text> 
								{ ( age >= 0 && age < 7 ) && <Badge color="green">Current</Badge> }
							</Pane> 
						</Link>
					);
				})}
			</Pane>
		</>
	);
}
