
// deps
import React, { useState } from "react";

// app
import { Services, Panel, TopNav, Dashboard, WorkoutsIndex, WeeksIndex } from "../index";
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
							<Route path="/workouts/:id?"><WorkoutsIndex /></Route>
							<Route path="/weeks/:id?"><WeeksIndex /></Route>
							<Route path="/"><Dashboard /></Route>
						</Switch>
					</div>
				</BrowserRouter>
			</UI.Provider>
		</>
	);
}
