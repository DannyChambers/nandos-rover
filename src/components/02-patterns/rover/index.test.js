import { render, screen } from "@testing-library/react";
import Component from "./index";

test("renders the component", () => {
	render(<Component />);
	const theComponent = screen.getByTestId("123abc");
	expect(theComponent).toBeInTheDocument();
});
