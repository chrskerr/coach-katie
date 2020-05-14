
// deps
import React from "react";
import { useParams } from "react-router-dom";

// app
import { Pane, Heading } from "evergreen-ui";
import Challenge from "./challenge";
import Challenges from "./challenges";

//
// Adultletics Admin / Views / Challenges / Index
//


export default function DrillsIndex () {
	const { id } = useParams();
	const _drillView = Boolean( id );
    
	return (
		<>
			<Pane>
				<Heading size={ 800 } color="#1070CA" marginBottom={ 48 }>Daily Challenges</Heading>
			</Pane>
			<Pane>
				{ _drillView ? <Challenge id={ id } /> : <Challenges /> }
			</Pane>
		</>
	);
}
