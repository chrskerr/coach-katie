
// deps
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactGA from 'react-ga';

// app
const HomeIndex = lazy(() => import( "../views/home" ));
const AuthContainer = lazy(() => import( "./auth" ));

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
                        <Route path="/admin"><AuthContainer /></Route>
                        <Route><HomeIndex /></Route>
                    </Switch>
                </Suspense>
			</BrowserRouter>
		</div>
	);
}
