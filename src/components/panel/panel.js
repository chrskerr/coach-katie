
// deps
import React, { useContext } from "react";
import { SideSheet } from "evergreen-ui";
import _ from "lodash";

// app
import { Services } from "../../views/index";
import panelMap from "./panels";

//
// Adultletics Admin / Views / Panel / Panel
//

const widthMap = {
	wide: 930,
	normal: 620,
};

export default function Panel () {
	const { panel, closePanel } = useContext( Services.UI );
	const _isOpen = !_.isEmpty( panel );
	const ShownPanel = panelMap[ _.get( panel, "panel", false ) ];
	const props = _.get( panel, "props", {});
	const width = widthMap[ _.get( panel, "width", "normal" ) ]; 

	return (
		<>
			<SideSheet
				isShown={ _isOpen }
				onCloseComplete={ closePanel }
				preventBodyScrolling
				width={ width }
			>
				<div className="v-panel">
					{ ( _isOpen && ShownPanel ) && <ShownPanel props={ props } /> }
				</div>
			</SideSheet>
		</>
	);
}

// example: openPanel({ panel: "auth/sign-in", props: { id: "123" }, width: "wide" })
