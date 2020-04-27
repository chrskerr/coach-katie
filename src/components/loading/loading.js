
// deps
import React from "react";

// app
import { Pane, Spinner } from "evergreen-ui";

//
// Adultletics Admin / Components / Loading / Loading
//


export default function Loading () {
	return (
		<Pane display="flex" alignItems="center" justifyContent="center" height={ "100%" } >
			<Spinner />
		</Pane>
	);
}
