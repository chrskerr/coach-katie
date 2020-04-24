
// deps
import React, { useContext } from "react";
import { SideSheet } from "evergreen-ui";
import _ from "lodash";

// app
import { Services } from "../index";
import panelMap from "./panels";

//
// Adultletics Admin / Views / Panel / Panel
//


export default function Panel () {
	const { panel, closePanel } = useContext( Services.UI );
	const _isOpen = !_.isEmpty( panel );
	const ShownPanel = panelMap[ panel.panel ];

	return (
		<>
			<SideSheet
				isShown={ _isOpen }
				onCloseComplete={ closePanel }
			>
				<div className="v-panel">
					{ ( _isOpen && ShownPanel ) && <ShownPanel /> }
				</div>
			</SideSheet>
		</>
	);
}
