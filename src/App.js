import React, { useEffect, useState } from "react";

import "./App.scss";

import Heading from "./components/01-arrangements/heading";
import ControlPanel from "./components/01-arrangements/control-panel";

import Textarea from "./components/02-patterns/textarea";
import Button from "./components/02-patterns/button";
import Rover from "./components/02-patterns/rover";

import Plateau from "./components/03-modules/plateau";

function App() {
	const [control, setControl] = useState(
		`5 5
3 4 E
MMM
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`
	);
	const [queue, setQueue] = useState([]);
	const [stepX, setStepX] = useState(null);
	const [stepY, setStepY] = useState(null);

	useEffect(() => {
		setStepX();
		setStepY();
		if (queue.length) {
			processQueue();
		}
	}, [queue.length]);

	const addToQueue = (newData) => {
		const newQueue = [...queue];
		let dataAsArray = newData.split(/\n/g); //Split by line break -- Problem here... If only one set of instructions, there still may be a line-break

		let grid = dataAsArray[0].replace(/\s/g, "");
		grid = grid.split("");

		setStepX(grid[0]);
		setStepY(grid[1]);

		dataAsArray.shift(); //Remove the grid size data

		dataAsArray.map((item, index) => {
			//Make pairs of instructions and add to queue
			if (index % 2 === 0) {
				const newPair = dataAsArray.slice(index, index + 2);
				const origins = newPair[0].split(" ");
				const newDataObj = {
					id: makeID(),
					startPosition: [...origins[0], ...origins[1]],
					orientation: origins[2],
					manoeuvres: newPair[1].split(""),
					status: null,
				};
				newQueue.push(newDataObj);
			}
		});

		setQueue(newQueue);
	};

	const makeID = () => {
		let randLetter = String.fromCharCode(
			65 + Math.floor(Math.random() * 26)
		);
		return randLetter + Date.now();
	};

	const processQueue = (dataObjID) => {
		if (queue.length) {
			console.log("Called process queue");

			let newQueue = [...queue];
			let newRoverIndex = 0;

			if (dataObjID) {
				console.log(
					"processQueue called from a finished rover: ",
					dataObjID
				);
				//Remove the active status from the used rover..
				newQueue.map((dataObj, index) => {
					console.log("index: ", index);
					if (dataObjID === dataObj.id) {
						dataObj.status = "used";
						if (queue.length === index + 1) {
							newRoverIndex = null; //This was the last in the queue..
						} else {
							newRoverIndex = index + 1;
						}
					}
				});
			}

			if (newRoverIndex !== null) {
				newQueue[newRoverIndex].status = "active";
			}

			setQueue(newQueue);
		}
	};

	return (
		<div className='App'>
			<Heading
				level='h1'
				alignment='center'
				text='Chickens in Space!'
				classes='title'
			/>
			<div class='controls'>
				<ControlPanel>
					<Heading level='h2' appearance='h5' text='Broadcast' />
					<Textarea value={control} change={setControl} />
					<Button
						text='Send instruction'
						click={() => {
							addToQueue(control);
						}}
					/>
				</ControlPanel>
			</div>
			<Plateau stepX={stepX} stepY={stepY}>
				{(() => {
					if (queue.length > 0) {
						return (
							<>
								{queue.map((rover, index) => {
									return (
										<Rover
											key={`_${index}`}
											roverCount={index}
											navigationData={rover}
											stepX={stepX}
											stepY={stepY}
											roverReport={processQueue}
										/>
									);
								})}
							</>
						);
					}
				})()}
			</Plateau>
		</div>
	);
}

export default App;
