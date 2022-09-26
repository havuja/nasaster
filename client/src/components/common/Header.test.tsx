import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  test("renders learn react link", () => {
    render(<Header />);
    const titleElement = screen.getByText(/Nasaster client application/i);
    expect(titleElement).toBeInTheDocument();
  });
});
