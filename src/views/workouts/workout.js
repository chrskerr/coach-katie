
// deps
import React from "react";
import { useParams } from "react-router-dom";

// app
import { Pane, Heading } from "evergreen-ui";

//
// Adultletics Admin / Views / Workouts / Workouts
//


export default function Workouts () {
	const { id: workoutId } = useParams();
	console.log( workoutId );

	return (
		<>
			<Pane>
				<Heading size={ 800 } color="#1070CA">Workouts</Heading>
			</Pane>
		</>
	);
}
