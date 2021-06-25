import React from "react";

import "./_index.scss";

const Button = (props) => {
	const handleClick = () => {
		if (props.click) {
			props.click();
		}
	};

	return (
		<button
			className={`button ${props.classes}`}
			style={props.styles}
			onClick={handleClick}
			disabled={props.disabled}
			data-testid='123abc'
		>
			{props.text}
		</button>
	);
};
export default Button;
