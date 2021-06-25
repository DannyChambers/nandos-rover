import React, { useState } from "react";

import "./_index.scss";

const TextArea = (props) => {
	const [text, setText] = useState(props.value);
	// console.log("props: ", props);

	const handleChange = (newText) => {
		// console.log("handleChange. newText: ", newText);
		setText(newText);

		if (props.change) {
			props.change(newText);
		}
	};

	return (
		<div
			className={`textarea ${props.classes}`}
			style={props.styles}
			data-testid='123abc'
		>
			<textarea
				cols='10'
				onChange={(event) => {
					handleChange(event.target.value);
				}}
				value={text}
				disabled={props.disabled}
			></textarea>
		</div>
	);
};
export default TextArea;
