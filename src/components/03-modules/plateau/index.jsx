import React from "react";

import "./_index.scss";

const Plateau = (props) => {
	const gridX = 100 / props.stepX;
	const gridY = 100 / props.stepY;

	return (
		<div
			className={`plateau ${props.classes}`}
			style={{
				borderColor: "rgba(206, 9, 36, 0.8)",
				borderStyle: "solid",
				borderWidth: "10px",
				background: `repeating-linear-gradient(0deg, rgba(206, 9, 36, 0.8) 0%, rgba(206, 9, 36, 0.8) 1%, transparent 1%, transparent ${gridY}%), repeating-linear-gradient(90deg, rgba(206, 9, 36, 0.8) 0%, rgba(206, 9, 36, 0.8) 1%, transparent 1%, transparent ${gridX}%)`,
			}}
			data-testid='123abc'
		>
			{props.children}
		</div>
	);
};
export default Plateau;
