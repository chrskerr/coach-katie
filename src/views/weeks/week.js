
// deps
import React from "react";
import PropTypes from "prop-types";

// app
import { Pane, Text } from "evergreen-ui";

//
// Adultletics Admin / Views / Week / Week
//


export default function Week ( props ) {
	const { id } = props;

	return (
		<>
			<Pane>
				<Text>{ id }</Text>
			</Pane>
		</>
	);
}
Week.propTypes = {
	id: PropTypes.string,
};
