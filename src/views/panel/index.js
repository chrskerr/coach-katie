
// deps
import React, { useContext } from "react";
import { SideSheet } from "evergreen-ui";
import _ from "lodash";

// app
import { UI } from "../app/services";

//
// Pantry / Views / Panel / Panel
//


export default function Panel () {
	const { panel, closePanel } = useContext( UI );
	const _isOpen = !_.isEmpty( panel );

	return (
		<>
			<SideSheet
				isShown={ _isOpen }
				onCloseComplete={ closePanel }
			>
				<div className="v-panel">
				</div>
			</SideSheet>
		</>
	);
}
