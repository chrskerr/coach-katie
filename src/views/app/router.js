
// deps
import React, { useState } from "react";
import { Pane } from "evergreen-ui";

// app
import { Services, Panel, TopNav, Dashboard, Workouts } from "../index";
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
							{/* <Route path="/workouts/:id"><Workout /></Route> */}
							<Route path="/workouts"><Workouts /></Route>
							<Route path="/"><Dashboard /></Route>
						</Switch>
					</div>
				</BrowserRouter>
			</UI.Provider>
		</>
	);
}
