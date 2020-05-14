
// deps
import React, { useContext } from "react";
import { Avatar, Pane, Heading, Text, Button, Tablist, Tab } from "evergreen-ui";
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
				<Pane alignItems="center" justifyContent="center">
					<Heading size={ 200  }>Adultletics Employee Dashboard</Heading>
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
										isSelected={ route === "/admin" ? pathname === route : pathname.startsWith( route ) }
										aria-controls={ `panel-${ name }` }
										height={ 40 }
									>
										{ name }
									</Tab>
								))}
							</Tablist>
						</Pane>
						<Pane display="flex" alignItems="center">
							<Button marginRight={ 16 } onClick={ signOut }>Log Out</Button>
							<Avatar name={ authUser.first_name } size={ 40 } />
						</Pane>
					</Pane> 
					: 
					<Pane display="flex" flex={ 1 } justifyContent="space-between" paddingLeft={ 16 }>
						<Pane display="flex" alignItems="center">
							{ isAuthenticating ? <></> : <Text color="red">You must log in to continue</Text> } 
						</Pane>
						<Pane display="flex" alignItems="center">
							<Button isLoading={ isAuthenticating } marginRight={ 16 } onClick={ () => openPanel({ panel: "auth/sign-in" }) }>Log In</Button> 
							<Avatar name={ authUser.first_name } size={ 40 } />
						</Pane>
					</Pane> 
				}
			</Pane>
		</div>
	);
}
