
// deps
import React from "react";
import { useParams } from "react-router-dom";

// app
import { Pane, Heading } from "evergreen-ui";
import Week from "./week";
import Weeks from "./weeks";

//
// Adultletics Admin / Views / Weeks / Index
//


export default function WeeksIndex () {
	const { id } = useParams();
	const _weekView = Boolean( id );
    
	return (
		<>
			<Pane>
				<Heading size={ 800 } color="#1070CA" marginBottom={ 48 }>Weeks</Heading>
			</Pane>
			<Pane>
				{ _weekView ? <Week id={ id } /> : <Weeks /> }
			</Pane>
		</>
	);
}
