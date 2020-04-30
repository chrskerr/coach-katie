
// deps
import React, { useState, useContext, useEffect } from "react";

// app
import { Services, Panel, TopNav, Dashboard, WorkoutsIndex, WeeksIndex, DrillsIndex, Loading } from "../index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { toaster, Pane } from "evergreen-ui";

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
        
	useEffect(() => { if ( window.innerWidth < 1000 ) toaster.warning( "This page is designed for a larger browswer", { duration: 30, position: "top-right" });}, []);

	return (
		<>
			<UI.Provider value={ ui }>
				<BrowserRouter>
					<Panel />
					<Pane background="tint1" minHeight="100vh">
						<TopNav />
						<div className="v-router">
							{ isAuthenticated ? <Switch>
								<Route path="/drills/:id?"><DrillsIndex /></Route>
								<Route path="/workouts/:id?"><WorkoutsIndex /></Route>
								<Route path="/weeks/:id?"><WeeksIndex /></Route>
								<Route path="/"><Dashboard /></Route>
							</Switch> : <Loading /> }
						</div>
					</Pane>
				</BrowserRouter>
			</UI.Provider>
		</>
	);
}
