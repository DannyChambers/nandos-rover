import React from "react";

import "./_index.scss";

const Heading = (props) => {
	const appearance = props.appearance || props.level;

	let El;

	switch (props.level) {
		case "h1":
			El = "h1";
			break;
		case "h2":
			El = "h2";
			break;
		case "h3":
			El = "h3";
			break;
		case "h4":
			El = "h4";
			break;
		default:
			El = "h5";
			break;
	}

	return (
		<El
			className={`heading heading--${appearance} heading--${props.alignment} ${props.classes}`}
			style={props.styles}
			data-testid='123abc'
		>
			{props.text}
		</El>
	);
};
export default Heading;
