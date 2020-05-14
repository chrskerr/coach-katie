
// deps
import React, { useState, useContext, useEffect } from "react";
import _ from "lodash";

// app
import { Services, Panel, TopNav, Dashboard, WorkoutsIndex, WeeksIndex, DrillsIndex, DailyChallengesIndex, Loading } from "../index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { toaster, Pane } from "evergreen-ui";

//
// Adultletics Admin / Views / App / App
//


const getBreakpoint = () => {
	const width = window.innerWidth;
	if ( width <= 640 ) return "small";
	if ( width <= 1008 ) return "medium";
	return "large";
};

export default function Router () {
	const { UI, Auth } = Services;
	const [ ui, setUI ] = useState({
		panel: {},
		openPanel: payload => setUI( ui => ({ ...ui, panel: payload })),
		closePanel: () => setUI( ui => ({ ...ui, panel: {}})),
		breakpoint: getBreakpoint(),
		setBreakpoint: payload => setUI( ui => ({ ...ui, breakpoint: payload })),
	});
	const { isAuthenticated, isAuthenticating } = useContext( Auth );
	const { breakpoint, setBreakpoint } = ui;

	useEffect(() => window.addEventListener( "resize", _.debounce(() => setBreakpoint( getBreakpoint()), 1000 )), [ setBreakpoint ]);
	useEffect(() => { if ( breakpoint !== "large" ) toaster.warning( "This page is designed for a larger browswer", { duration: 600 });}, [ breakpoint ]);

	return (
		<>
			<UI.Provider value={ ui }>
				<BrowserRouter>
					<Panel />
					<Pane background="tint1" minHeight="100vh">
						<TopNav />
						<div className="v-router">
							{ isAuthenticating && <Loading /> }
							{ ( !isAuthenticating && !isAuthenticated ) && <p>Please log in to continue</p> }
							{ ( !isAuthenticating && isAuthenticated ) && 
                                <Switch>
                                	<Route path="/drills/:id?"><DrillsIndex /></Route>
                                	<Route path="/workouts/:id?"><WorkoutsIndex /></Route>
                                	<Route path="/weeks/:id?"><WeeksIndex /></Route>
                                	<Route path="/challenges/:id?"><DailyChallengesIndex /></Route>
                                	<Route path="/"><Dashboard /></Route>
                                </Switch>
							}
						</div>
					</Pane>
				</BrowserRouter>
			</UI.Provider>
		</>
	);
}
