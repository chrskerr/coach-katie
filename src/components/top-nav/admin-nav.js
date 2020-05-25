
// deps
import React, { useContext } from "react";
import { Avatar, Pane, Tablist, Tab } from "evergreen-ui";
import _ from "lodash";

// app
import { Services } from "../../views/index";
import { useHistory, useLocation } from "react-router-dom";

//
// Adultletics Admin / Views / Top Nav / Admin Nav
//


export default function AdminNav () {
	const history = useHistory();
	const { pathname } = useLocation();
	const { openPanel } = useContext( Services.UI );
	const { isAuthenticated, isAuthenticating, authUser, signOut } = useContext( Services.Auth );

	const tabs = [
		{
			name: "Homepage",
			route: "/",
		},
		{
			name: "Dashboard",
			route: "/admin",
		},
		{
			name: "Workouts",
			route: "/admin/workouts",
		},
		{
			name: "Weeks",
			route: "/admin/weeks",
		},
		{
			name: "Drills",
			route: "/admin/drills",
		},
		{
			name: "Daily Challenges",
			route: "/admin/challenges",
		},
	];

	return (
		<div className="c-top-nav">
			<Pane display="flex" height={ 78 } alignItems="center">
				<Pane display="flex" alignItems="center" justifyContent="center">
					<h4 style={{ margin: 0 }}>Adultletics Employee Dashboard</h4>
				</Pane>
				{ isAuthenticated ?
					<Pane display="flex" flex={ 1 } justifyContent="space-between" paddingLeft={ 16 }>
						<Pane display="flex" alignItems="center">
							<Tablist alignItems="center">
								{ _.map( tabs, ({ name, route }) => (
									<Tab
										key={ route }
										id={ route }
										onSelect={ () => history.push( route ) }
										isSelected={ ( route === "/" || route === "/admin" ) ? pathname === route : pathname.startsWith( route ) }
										aria-controls={ `panel-${ name }` }
										height={ 40 }
									>
										{ name }
									</Tab>
								))}
							</Tablist>
						</Pane>
						<Pane display="flex" alignItems="center">
							<button className="alt small" style={{ marginRight: 16 }} onClick={ signOut }>Log Out</button>
							<Avatar name={ authUser.first_name } size={ 40 } />
						</Pane>
					</Pane> 
					: 
					<Pane display="flex" flex={ 1 } justifyContent="space-between" paddingLeft={ 16 }>
						<Pane display="flex" alignItems="center">
							{ isAuthenticating ? <></> : <p style={{ color: "red", margin: 0 }}>You must log in to continue</p> } 
						</Pane>
						<Pane display="flex" alignItems="center">
							<button className="alt small" isLoading={ isAuthenticating } style={{ marginRight: 16 }} onClick={ () => openPanel({ panel: "auth/sign-in" }) }>Log In</button> 
							<Avatar name={ authUser.first_name } size={ 40 } />
						</Pane>
					</Pane> 
				}
			</Pane>
		</div>
	);
}
