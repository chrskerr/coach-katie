
// deps
import React from "react";
import { useParams } from "react-router-dom";

// app
import { Pane, Heading } from "evergreen-ui";
import Drill from "./drill";
import Drills from "./drills";

//
// Adultletics Admin / Views / Weeks / Index
//


export default function DrillsIndex () {
	const { id } = useParams();
	const _drillView = Boolean( id );
    
	return (
		<>
			<Pane>
				<Heading size={ 800 } color="#1070CA" marginBottom={ 48 }>Drills</Heading>
			</Pane>
			<Pane>
				{ _drillView ? <Drill id={ id } /> : <Drills /> }
			</Pane>
		</>
	);
}
