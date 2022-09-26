import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./Table";
import { NearEarthObjectTableData } from "../../types/Nasa";

const tableHeaders: [keyof NearEarthObjectTableData, string][] = [
  ["close_approach_date", "Date"],
  ["id", "Id"],
  ["name", "Name"],
  ["kilometers", "Distance(km)"],
];

const rows: NearEarthObjectTableData[] = [
  {
    id: "1",
    name: "object1",
    close_approach_date: "2022-01-01",
    kilometers: 1000,
  },
];

describe("Table component", () => {
  test("renders Table component", () => {
    render(
      <Table<NearEarthObjectTableData>
        headers={tableHeaders}
        rows={rows}
        useKey="id"
      />
    );
    rows.forEach((row) => {
      const element = screen.getByText(row.name);
      expect(element).toBeInTheDocument();
    });
  });
});
