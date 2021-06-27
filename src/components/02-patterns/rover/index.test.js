import { render } from "@testing-library/react";
import Rover from "./index";

jest.mock("./index", () => ({
	Rover: jest.fn(() => <div data-testid='123abc' />),
}));

const navigationData = {
	id: "a123456",
	startPosition: [1, 2],
	orientation: "N",
	manoeuvres: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
	status: "active",
};

test("renders a Rover", () => {
	render(<Rover navigationData={navigationData} />);
	expect(screen.queryByTestId("123abc")).toBeInTheDocument();
});

// test("takes the input as props and returns the end position and orientation", () => {
// 	render(<Rover navigationData={} />);

// 	//Mock the component with props..
// 	//5 5
// 	//1 2 N
// 	//LMLMLMLMM
// 	//3 3 E
// 	//MMRMMRMRRM

// 	//Capture the roverReport result

// 	//Compare the result to the expected
// 	//1 3 N
// 	//5 1 E
// });
