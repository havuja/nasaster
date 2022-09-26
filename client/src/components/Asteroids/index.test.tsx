import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Listing from "./index";
// import * as useAsteroidHook from "./useAsteroid";

import { NearEarthObjectTableData } from "../../types/Nasa";

const rows: NearEarthObjectTableData[] = [
  {
    id: "1",
    name: "object1",
    close_approach_date: "2022-01-01",
    kilometers: 1000,
  },
];

const mockFetchAsteroids = jest.fn();
jest.mock("./useAsteroid", () => ({
  __esModule: true,
  ...jest.requireActual("./useAsteroid"),
  default: () => ({
    asteroids: rows,
    fetchAsteroids: mockFetchAsteroids,
    loading: false,
  }),
}));

describe("Asteroid listing view", () => {
  test("renders listing view", () => {
    render(<Listing />);
    const datepickerElements = screen.getAllByTestId(/datepicker-input/i);
    expect(datepickerElements.length).toBe(2);
  });

  test("user can input dates, click search button and fetchAsteroids is called with input start date and end date", () => {
    const start = "2022-01-01";
    const end = "2022-01-02";
    const view: any = render(<Listing />);
    const button = screen.getByTestId("button-search");
    expect(button).toBeDisabled();
    // select dates
    fireEvent.change(
      view.getByTestId("datepicker-input-start").querySelector("input"),
      {
        target: { value: start },
      }
    );
    fireEvent.change(
      view.getByTestId("datepicker-input-end").querySelector("input"),
      {
        target: { value: end },
      }
    );
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    expect(mockFetchAsteroids).toBeCalledWith(start, end);
  });

  test("asteroids are listed", () => {
    render(<Listing />);

    const tableElement = screen.queryByTestId(/table-asteroids/i);

    expect(tableElement).toBeInTheDocument();
  });
});
