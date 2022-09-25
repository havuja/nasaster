import request from "supertest";

import app from "./app";

describe("Root routes", () => {
  test("Get ok from root ", async () => {
    const res = await request(app).get("/");

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: "Ok" });
  });
});
