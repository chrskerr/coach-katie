
// deps
import React, { useState } from "react";

// app
import { UI } from "./services";
import { Panel } from "../index";

//
// Pantry / Views / App / App
//


export default function Router () {
	const [ ui, setUI ] = useState({
		panel: {},
		openPanel: payload => setUI( ui => ({ ...ui, panel: payload })),
		closePanel: () => setUI( ui => ({ ...ui, panel: {}})),
		notifications: [{}],
		addNotification: () => {},
	});

	return (
		<>
			<UI.Provider value={ ui }>
				<Panel />
				<button onClick={ () => ui.openPanel({ panel: "test", props: { id: "123" }}) }>Open</button>
			</UI.Provider>
		</>
	);
}
