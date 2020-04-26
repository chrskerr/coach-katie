
// deps
import React, { useContext } from "react";
import { Avatar, Pane, Heading, Button, Tablist, Tab } from "evergreen-ui";
import _ from "lodash";

// app
import { Services } from "../../views/index";
import { useHistory, useLocation } from "react-router-dom";

//
// Adultletics Admin / Views / TopNav / TopNav
//


export default function TopNav () {
	const history = useHistory();
	const { pathname } = useLocation();
	const { openPanel } = useContext( Services.UI );
	const { isAuthenticated, authUser, signOut } = useContext( Services.Auth );

	const tabs = [
		{
			name: "Home",
			route: "/",
		},
		{
			name: "Workouts",
			route: "/workouts",
		},
		{
			name: "Programmes",
			route: "/programmes",
		},
	];

	return (
		<div className="c-top-nav">
			<Pane display="flex" height={ 78 } alignItems="center">
				<Pane alignItems="center" justifyContent="center" marginLeft={ 24 }>
					<Heading size={ 200  } >Adultletics Admin Panel</Heading>
				</Pane>
				<Pane display="flex" flex={ 1 } justifyContent="space-between" paddingLeft={ 16 }>
					<Pane alignItems="center">
						<Tablist alignItems="center">
							{ _.map( tabs, ({ name, route }) => (
								<Tab
									key={ route }
									id={ route }
									onSelect={ () => history.push( route ) }
									isSelected={ route === pathname }
									aria-controls={ `panel-${ name }` }
									height={ 40 }
								>
									{ name }
								</Tab>
							))}
						</Tablist>
					</Pane>
					<Pane display="flex" alignItems="center" paddingRight={ 16 }>
						{ isAuthenticated ? <Button marginRight={ 16 } onClick={ signOut }>Log Out</Button> : <Button marginRight={ 16 } onClick={ () => openPanel({ panel: "auth/sign-in", props: { id: "123" }}) }>Log In</Button> }
						<Avatar name={ authUser.first_name } size={ 40 } />
					</Pane>
				</Pane>
			</Pane>
		</div>
	);
}
