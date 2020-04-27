
// deps
import React, { useState, useContext } from "react";

// app
import { Services, Panel, TopNav, Dashboard, WorkoutsIndex, WeeksIndex, DrillsIndex } from "../index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Pane } from "evergreen-ui";

//
// Adultletics Admin / Views / App / App
//


export default function Router () {
	const { UI, Auth } = Services;
	const [ ui, setUI ] = useState({
		panel: {},
		openPanel: payload => setUI( ui => ({ ...ui, panel: payload })),
		closePanel: () => setUI( ui => ({ ...ui, panel: {}})),
		notifications: [{}],
		addNotification: () => {},
	});
	const { isAuthenticated } = useContext( Auth );
    
	return (
		<>
			<UI.Provider value={ ui }>
				<BrowserRouter>
					<Panel />
					<Pane background="tint1" minHeight="100vh">
						<TopNav />
						<div className="v-router">
							{ isAuthenticated && <Switch>
								<Route path="/drills/:id?"><DrillsIndex /></Route>
								<Route path="/workouts/:id?"><WorkoutsIndex /></Route>
								<Route path="/weeks/:id?"><WeeksIndex /></Route>
								<Route path="/"><Dashboard /></Route>
							</Switch> }
						</div>
					</Pane>
				</BrowserRouter>
			</UI.Provider>
		</>
	);
}
