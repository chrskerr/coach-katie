
// deps
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactGA from 'react-ga';

// app
const Home = lazy(() => import( "../views/home/home" ));
const ReactApp = lazy(() => import( "./react-app" ));

//
// Adultletics / App / App
//

ReactGA.initialize('UA-000000-01')

export default function App () {
	return (
		<div className="App">
			<BrowserRouter>
                <Suspense fallback={ <></> }>
                    <Switch>
                        <Route exact path="/" component={ Home } />
                        <Route component={ ReactApp } />
                    </Switch>
                </Suspense>
			</BrowserRouter>
		</div>
	);
}
