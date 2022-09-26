import request from "supertest"; // eslint-disable-line camelcase

import app from "../app";
import nasaApi from "../services/nasaApi";

const correct = {
  element_count: 1,
  near_earth_objects: {
    "2022-09-20": [{ id: "1", name: "object", close_approach_data: [] }],
  },
};

const failedExternalResponse = { status: 404, statusText: "Fail" };
const fail = {
  data: {},
  error: failedExternalResponse,
  response: "Error",
};
describe("Asteroids routes", () => {
  test("Get params missing error without params", async () => {
    const res = await request(app).get("/asteroids");
    expect(res.body).toEqual({ response: "Invalid date params YYYY-MM-DD" });
  });

  test("Get invalid params error with incorrect param format", async () => {
    const res1 = await request(app).get(
      "/asteroids?start_date=2022-01-ab&end_date=2022-01-01"
    );
    const res2 = await request(app).get(
      "/asteroids?start_date=2022-01-01&end_date=2022-01-cd"
    );
    const res3 = await request(app).get(
      "/asteroids?start_date=2022-01-ab&end_date=2022-01-cd"
    );
    expect(res1.body).toEqual({ response: "Invalid date params YYYY-MM-DD" });
    expect(res2.body).toEqual({ response: "Invalid date params YYYY-MM-DD" });
    expect(res3.body).toEqual({ response: "Invalid date params YYYY-MM-DD" });
  });

  test("Get param order error with start_date after end_date", async () => {
    const res = await request(app).get(
      "/asteroids?start_date=2022-01-02&end_date=2021-01-01"
    );
    expect(res.body).toEqual({ response: "end_date is before start_date" });
  });

  test("Get error response with failed external request", async () => {
    const getAsteroidsMock = jest.spyOn(nasaApi, "getAsteroids");
    getAsteroidsMock.mockRejectedValue({
      response: failedExternalResponse,
    });
    const res = await request(app).get(
      "/asteroids?start_date=2022-01-01&end_date=2022-01-01"
    );

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(fail);
  });

  test("Get status 200 with correct parameters and succesfull response", async () => {
    const getAsteroidsMock = jest.spyOn(nasaApi, "getAsteroids");
    getAsteroidsMock.mockImplementation(
      jest.fn(() => {
        return new Promise((resolve) => {
          resolve(correct);
        });
      })
    );
    const res = await request(app).get(
      "/asteroids?start_date=2022-01-01&end_date=2022-01-02"
    );

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ response: "Ok", data: correct });
  });
});
