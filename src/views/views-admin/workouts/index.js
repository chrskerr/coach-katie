
// deps
import React from "react";
import { useParams } from "react-router-dom";

// app
import { Pane, Heading } from "evergreen-ui";
import Workout from "./workout";
import Workouts from "./workouts";

//
// Adultletics Admin / Views / Workouts / Index
//


export default function WorkoutsIndex () {
	const { id } = useParams();
	const _workoutView = Boolean( id );
    
	return (
		<>
			<Pane>
				<Heading size={ 800 } color="#1070CA" marginBottom={ 48 }>Workouts</Heading>
			</Pane>
			<Pane>
				{ _workoutView ? <Workout id={ id } /> : <Workouts /> }
			</Pane>
		</>
	);
}
