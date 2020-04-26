
// deps
import React, { useState } from "react";

// app
import { Services, Panel, TopNav, Dashboard, Workout, Workouts, Programme, Programmes } from "../index";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//
// Adultletics Admin / Views / App / App
//


export default function Router () {
	const { UI } = Services;
	const [ ui, setUI ] = useState({
		panel: {},
		openPanel: payload => setUI( ui => ({ ...ui, panel: payload })),
		closePanel: () => setUI( ui => ({ ...ui, panel: {}})),
		notifications: [{}],
		addNotification: () => {},
	});
    
	return (
		<>
			<UI.Provider value={ ui }>
				<Panel />
				<BrowserRouter>
					<TopNav />
					<div className="v-router">
						<Switch>
							<Route path="/workouts/:id"><Workout /></Route>
							<Route path="/workouts"><Workouts /></Route>
							<Route path="/programmes/:id"><Programme /></Route>
							<Route path="/programmes"><Programmes /></Route>
							<Route path="/"><Dashboard /></Route>
						</Switch>
					</div>
				</BrowserRouter>
			</UI.Provider>
		</>
	);
}
