import nasaApi from "./nasaApi";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: "success" })),
}));

describe("NasaAPI service", () => {
  test("Returns data field", async () => {
    const res = await nasaApi.getAsteroids("2022-01-01", "2022-01-01");
    expect(res).toEqual("success");
  });
});
