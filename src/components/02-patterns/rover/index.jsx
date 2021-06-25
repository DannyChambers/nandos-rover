import React, { useEffect, useState, useRef } from "react";

import rover from "../../../assets/images/chicken-1.png";

import "./_index.scss";

const Rover = (props) => {
	const [loaded, setLoaded] = useState(false);
	const [manoeuvres, setManoeuvres] = useState(null);

	const [position, setPosition] = useState(null);
	const positionRef = useRef(position);
	positionRef.current = position;

	const [orientation, setOrientation] = useState(null);
	const orientationRef = useRef(orientation);
	orientationRef.current = orientation;

	const [stepX, setStepX] = useState(null);
	const [stepY, setStepY] = useState(null);

	const [active, setActive] = useState(false);

	const [oob, setOOB] = useState(false);

	useEffect(() => {
		if (props.navigationData) {
			const x =
				(100 / props.stepX) * props.navigationData.startPosition[0];
			const y =
				(100 / props.stepY) * props.navigationData.startPosition[1];
			setPosition([x, y]);

			setOrientation(props.navigationData.orientation);
			setManoeuvres(props.navigationData.manoeuvres);

			const stepX = 100 / props.stepX;
			setStepX(stepX);

			const stepY = 100 / props.stepY;
			setStepY(stepY);

			setLoaded(true);
		}
	}, []);

	useEffect(() => {
		if (
			loaded &&
			props.navigationData &&
			props.navigationData.status === "active"
		) {
			setActive("active");
			let newMArray = [...manoeuvres];

			const timer = setTimeout(() => {
				move(newMArray[0], orientationRef.current, positionRef.current);
				newMArray.shift();
			}, 2000);

			if (newMArray.length === 0) {
				setActive("false");
				clearTimeout(timer);
				props.roverReport(props.navigationData.id);
			}

			setManoeuvres(newMArray);
		}
	}, [orientation, position, props.navigationData.status]);

	const move = (manoeuvre, ori, pos) => {
		// console.log("manoeuvre: ", manoeuvre);
		// console.log("ori: ", ori);
		// console.log("pos: ", pos);
		switch (manoeuvre) {
			case "L":
				console.log("Turn left");
				switch (ori) {
					case "N":
						setOrientation("W");
						break;
					case "E":
						setOrientation("N");
						break;
					case "S":
						setOrientation("E");
						break;
					default:
						setOrientation("S");
						break;
				}
				break;
			case "R":
				switch (ori) {
					case "N":
						setOrientation("E");
						break;
					case "E":
						setOrientation("S");
						break;
					case "S":
						setOrientation("W");
						break;
					default:
						setOrientation("N");
						break;
				}
				break;
			default:
				const x = pos[0];
				const y = pos[1];

				console.log("x + 20, y + 20: ", x + 20, y + 20);

				switch (ori) {
					case "N":
						if (y + stepY > 100) {
							setOOB("oob");
						}
						setPosition([x, y + stepY]);
						break;
					case "E":
						if (x + stepX > 100) {
							setOOB("oob");
						}
						setPosition([x + stepX, y]);

						break;
					case "S":
						if (y - stepY < 0) {
							setOOB("oob");
						}
						setPosition([x, y - stepY]);

						break;
					default:
						if (x - stepX < 0) {
							setOOB("oob");
						}
						setPosition([x - stepX, y]);

						break;
				}

				break;
		}
	};

	return loaded ? (
		<div
			className={`rover rover--orientation-${orientation} rover--${oob} ${props.classes}`}
			style={{
				bottom: `${position[1]}%`,
				left: `${position[0]}%`,
			}}
			data-testid='123abc'
		>
			<div
				className={`rover--orientation-${orientation} rover--${active}`}
			>
				<span
					style={{
						backgroundImage: `url(${rover})`,
					}}
				></span>
			</div>
		</div>
	) : (
		"Loading"
	);
};
export default Rover;
