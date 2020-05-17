
// deps
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactGA from 'react-ga';

// app
const Home = lazy(() => import( "../views/home/home" ));
const AuthContainer = lazy(() => import( "./react-app" ));

//
// Adultletics / App / App
//

ReactGA.initialize('UA-165263586-1')

export default function App () {
	return (
		<div className="App">
			<BrowserRouter>
                <Suspense fallback={ <></> }>
                    <Switch>
                        <Route exact path="/" component={ Home } />
                        <Route component={ AuthContainer } />
                    </Switch>
                </Suspense>
			</BrowserRouter>
		</div>
	);
}
