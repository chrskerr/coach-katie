
// deps
import React from "react";
import { useParams } from "react-router-dom";

// app
import { Pane, Heading } from "evergreen-ui";

//
// Adultletics Admin / Views / Programmes / Programmes
//


export default function Programme () {
	const { id: programmeId } = useParams();
	console.log( programmeId );

	return (
		<>
			<Pane>
				<Heading size={ 800 } color="#1070CA">Programmes</Heading>
			</Pane>
		</>
	);
}
