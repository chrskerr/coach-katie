
// deps
import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

//app
import Dashboard from "./dashboard/dashboard";
import WorkoutsIndex from "./workouts";
import WeeksIndex from "./weeks";
import DrillsIndex from "./drills";
import DailyChallengesIndex from "./daily-challenges";
import Loading from "../../components/loading/loading";
import Services from "../../app/services";
import AdminNav from "../../components/top-nav/admin-nav";

//
// Adultletics / Views / Admin / Index 
//

export default function Admin () {
	const { isAuthenticating, isAuthenticated } = useContext( Services.Auth );
	// const { breakpoint } = useContext( Services.UI );
	
	// useEffect(() => { if ( breakpoint !== "large" ) toaster.warning( "This page is designed for a larger browswer", { duration: 600 });}, [ breakpoint ]);

	return (
		<>
			<AdminNav />
			{ isAuthenticating && <Loading /> }
			{ ( !isAuthenticating && isAuthenticated ) && 
				<Switch>
					<Route path="/admin/drills/:id?"><DrillsIndex /></Route>
					<Route path="/admin/workouts/:id?"><WorkoutsIndex /></Route>
					<Route path="/admin/weeks/:id?"><WeeksIndex /></Route>
					<Route path="/admin/challenges/:id?"><DailyChallengesIndex /></Route>
					<Route path="/admin"><Dashboard /></Route>
				</Switch>
			}
		</>
	);
}

export { default as Queries } from "../../app/queries";
export { default as Services } from "../../app/services";
export { default as Loading } from "../../components/loading/loading";
export { default as constants } from "../../base/constants";
