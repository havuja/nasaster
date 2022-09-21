import add from "date-fns/add";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isValidDate from "date-fns/isValid";

/**
 *
 * @param str Date in string format yyyy-MM-dd
 * @returns boolean
 */
export const validateDate = (str: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(str) && isValidDate(new Date(str));

/**
 *
 * @param start Start date of given period
 * @param end End date of given period
 * @param step Interval size
 * @returns Array of tuple of interval start and end dates as string
 */
export const splitIntervals = (start: string, end: string, step = 8) => {
  const intervalFirstDays = eachDayOfInterval(
    { start: new Date(start), end: new Date(end) },
    { step }
  );
  const intervals = intervalFirstDays.map((date) => {
    const startDateInInterval = new Date(date);
    const intervalEnd = add(startDateInInterval, { days: step - 1 });
    const endDateInInterval = isAfter(intervalEnd, new Date(end))
      ? new Date(end)
      : intervalEnd;

    return [
      format(startDateInInterval, "yyyy-MM-dd"),
      format(endDateInInterval, "yyyy-MM-dd"),
    ];
  });
  return intervals;
};
