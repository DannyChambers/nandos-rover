import React from "react";

import "./_index.scss";

const ControlPanel = (props) => {
	return (
		<div
			className={`control-panel ${props.classes}`}
			style={props.styles}
			data-testid='123abc'
		>
			{props.children}
		</div>
	);
};
export default ControlPanel;
