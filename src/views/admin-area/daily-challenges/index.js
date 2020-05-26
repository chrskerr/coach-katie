
// deps
import React from "react";
import { useParams } from "react-router-dom";

// app
import { Pane } from "evergreen-ui";
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
				<h2 style={{ color: "#1070CA" }} marginBottom={ 48 }>Daily Challenges</h2>
			</Pane>
			<Pane>
				{ _drillView ? <Challenge id={ id } /> : <Challenges /> }
			</Pane>
		</>
	);
}
