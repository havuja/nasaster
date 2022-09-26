import axios from "axios";
import { NasasterApiResponse } from "../types/Nasa";

const API_URL = "http://localhost:3000";

/**
 *
 * @param startDate Start date string yyyy-MM-dd
 * @param endDate End date string yyyy-MM-dd
 * @returns Request Promise
 */
const getAsteroids = async (
  startDate: string,
  endDate: string
): Promise<NasasterApiResponse> => {
  const requestConfig = {
    params: { start_date: startDate, end_date: endDate },
  };
  return axios
    .get(`${API_URL}/asteroids`, requestConfig)
    .then((response) => response.data);
};

const nasasterApi = { getAsteroids };

export default nasasterApi;
