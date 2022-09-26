import { NasasterApiResponse } from "../types/Nasa";

const apiResponse: NasasterApiResponse = {
  response: "Ok",
  data: {
    element_count: 5,
    near_earth_objects: {
      "2022-09-10": [
        {
          id: "5",
          name: "Object 5",
          close_approach_data: [
            {
              close_approach_date: "2022-09-11",
              miss_distance: {
                kilometers: "101",
              },
            },
          ],
        },
      ],
      "2022-09-11": [
        {
          id: "1",
          name: "Object 1",
          close_approach_data: [
            {
              close_approach_date: "2022-09-11",
              miss_distance: {
                kilometers: "300",
              },
            },
          ],
        },
        {
          id: "2",
          name: "Object 2",
          close_approach_data: [
            {
              close_approach_date: "2022-09-11",
              miss_distance: {
                kilometers: "200",
              },
            },
          ],
        },
        {
          id: "3",
          name: "Object 3",
          close_approach_data: [
            {
              close_approach_date: "2022-09-11",
              miss_distance: {
                kilometers: "100",
              },
            },
          ],
        },
        {
          id: "4",
          name: "Object 4",
          close_approach_data: [
            {
              close_approach_date: "2022-09-11",
              miss_distance: {
                kilometers: "150",
              },
            },
          ],
        },
      ],
    },
  },
};

export default apiResponse;
