
// deps
import React, { useState, useContext } from "react";

// app
import { Services, Panel } from "../index";

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
	const { isAuthenticated, authUser, signOut } = useContext( Auth );

	return (
		<>
			<UI.Provider value={ ui }>
				<Panel />
				{ isAuthenticated ? 
					<>
						<p>Hello { authUser.first_name }</p>
						<button onClick={ signOut }>Log Out</button>
					</>
					: <button onClick={ () => ui.openPanel({ panel: "auth/sign-in", props: { id: "123" }}) }>Log In</button> }
			</UI.Provider>
		</>
	);
}
