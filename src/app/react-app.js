
// deps
import React, { useState, useEffect, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import _ from "lodash";

// app
import FirebaseProvider from "./firebase";
import ApolloProvider from "./apollo";
import Services from "./services"
import Panel from "../components/panel/panel"
import { Pane } from "evergreen-ui";

const Admin = lazy(() => import('../views/views-admin'))

//
// Adultletics / App / React App
//


export default function ReactApp () {
	const { Auth, UI } = Services;
	const [ auth, setAuth ] = useState({
		authUser: {},
		token: "",
		uid: "",
		isAuthenticating: true,
		isAuthenticated: false,
		updateAuth: payload => setAuth( auth => ({ ...auth, ...payload })),
		signIn: () => {},
		signOut: () => {},
	});
	const [ ui, setUI ] = useState({
		panel: {},
		openPanel: payload => setUI( ui => ({ ...ui, panel: payload })),
		closePanel: () => setUI( ui => ({ ...ui, panel: {}})),
		breakpoint: getBreakpoint(),
		setBreakpoint: payload => setUI( ui => ({ ...ui, breakpoint: payload })),
	});
	const { setBreakpoint } = ui;
    
	useEffect(() => window.addEventListener( "resize", _.debounce(() => setBreakpoint( getBreakpoint()), 1000 )), [ setBreakpoint ]);

	return (
		<Auth.Provider value={ auth }>
			<UI.Provider value={ ui }>
				<ApolloProvider>
					<FirebaseProvider>
						<Panel />
						<Pane background="tint1" minHeight="100vh">
							<div className="v-router">
								<Switch>
									<Route path="/admin" component={ Admin } />
								</Switch>
							</div>
						</Pane>                                
					</FirebaseProvider>
				</ApolloProvider>
			</UI.Provider>
		</Auth.Provider>
	);
}


const getBreakpoint = () => {
	const width = window.innerWidth;
	if ( width <= 640 ) return "small";
	if ( width <= 1008 ) return "medium";
	return "large";
};
