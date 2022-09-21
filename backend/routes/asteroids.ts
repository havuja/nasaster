import express, { Request, Response } from "express";
import isBefore from "date-fns/isBefore";

import nasaApi from "../services/nasaApi";
import { validateDate, splitIntervals } from "../utilities/dateHelpers";
import { NearEarthObject } from "../types/Nasa";

type Query = {
  start_date: string;
  end_date: string;
};

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const query = req.query as unknown as Query;
  const { start_date, end_date } = query; // eslint-disable-line camelcase

  // Validate format of parameters
  if (!validateDate(start_date) || !validateDate(end_date)) {
    res.status(422).jsonp({ response: "Invalid date params YYYY-MM-DD" });
    return;
  }

  // Validate timeline, start before end
  if (isBefore(new Date(end_date), new Date(start_date))) {
    res.status(422).jsonp({ response: "end_date is before start_date" });
    return;
  }

  const intervals = splitIntervals(start_date, end_date);

  const apiRequestPromises = intervals.map(([start, end]) =>
    nasaApi.getAsteroids(start, end)
  );

  Promise.all(apiRequestPromises)
    .then((apiResponses) => {
      let elementTotalCount = 0;
      // Reduce all dates and near earth objects to one object
      const nearEarthObjects: NearEarthObject = apiResponses.reduce(
        (prev, curr) => {
          // add object count to total
          elementTotalCount += curr.element_count ?? 0;
          return { ...prev, ...curr.near_earth_objects };
        },
        {}
      );

      res.jsonp({
        response: "Ok",
        data: {
          element_count: elementTotalCount,
          near_earth_objects: nearEarthObjects,
        },
      });
    })
    .catch((error) => {
      const { status, statusText } = error.response;
      res.jsonp({
        response: "Error",
        error: { status, statusText },
        data: {},
      });
    });
});

export default router;
