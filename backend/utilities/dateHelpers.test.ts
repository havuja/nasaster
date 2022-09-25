import { validateDate, splitIntervals } from "./dateHelpers";

const date = {
  "2022-01-01": true,
  "2022-13-01": false,
  "20222-01-01": false,
  "2022-011-01": false,
  "2022-01-011": false,
};

const timeframes = [
  {
    start: "2022-01-01",
    end: "2022-01-02",
    expectation: [["2022-01-01", "2022-01-02"]],
  },
  {
    start: "2022-01-01",
    end: "2022-01-09",
    expectation: [
      ["2022-01-01", "2022-01-08"],
      ["2022-01-09", "2022-01-09"],
    ],
  },
  {
    start: "2022-01-01",
    end: "2022-01-09",
    step: 9,
    expectation: [["2022-01-01", "2022-01-09"]],
  },
];

describe("Date helpers", () => {
  test("Validate date ", async () => {
    Object.entries(date).forEach(([string, expectation]) => {
      const res = validateDate(string);
      expect(res).toEqual(expectation);
    });
  });
  test("Split intervals from timeframe ", async () => {
    timeframes.forEach((frame) => {
      const { start, end, expectation, step } = frame;
      const res = splitIntervals(start, end, step);
      expect(res).toEqual(expectation);
    });
  });
});
