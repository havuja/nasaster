import React, { useState } from "react";
import Button from "@mui/material/Button";
import isBefore from "date-fns/isBefore";

import Table from "../common/Table";
import Datepicker from "../common/Datepicker";

import useAsteroid from "./useAsteroid";
import { NearEarthObjectTableData } from "../../types/Nasa";

function Asteroids() {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const { asteroids, fetchAsteroids, loading, error } = useAsteroid();

  const searchAsteroids = () => {
    if (startDate && endDate) {
      fetchAsteroids(startDate, endDate);
    }
  };

  const tableHeaders: [keyof NearEarthObjectTableData, string][] = [
    ["close_approach_date", "Date"],
    ["id", "Id"],
    ["name", "Name"],
    ["kilometers", "Distance(km)"],
  ];

  const isSearchDisabled =
    loading ||
    !startDate ||
    !endDate ||
    (startDate !== undefined &&
      endDate !== undefined &&
      isBefore(new Date(endDate), new Date(startDate)));

  return (
    <div>
      <Datepicker
        label="Start date"
        value={startDate ?? ""}
        onChange={setStartDate}
        testId="start"
      />
      <Datepicker
        label="End date"
        value={endDate ?? ""}
        onChange={setEndDate}
        testId="end"
      />
      <Button
        variant="contained"
        onClick={searchAsteroids}
        size="large"
        disabled={isSearchDisabled}
        data-testid="button-search"
      >
        {loading ? "Searching.." : "Search"}
      </Button>
      {error ? <div>Error happened. {error}</div> : null}
      {asteroids ? (
        <Table<NearEarthObjectTableData>
          headers={tableHeaders}
          rows={asteroids}
          useKey="id"
          testId="asteroids"
        />
      ) : null}
    </div>
  );
}

export default Asteroids;
