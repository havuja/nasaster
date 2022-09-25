import axios from "axios";
import dotenv from "dotenv";
import { NasaApiResponse } from "../types/Nasa";

dotenv.config();

const API_KEY = process.env.NASA_API_KEY;
const NASA_API = "https://api.nasa.gov/neo/rest/v1";

/**
 *
 * @param startDate Start date string yyyy-MM-dd
 * @param endDate End date string yyyy-MM-dd
 * @returns Request Promise
 */
const getAsteroids = async (
  startDate: string,
  endDate: string
): Promise<NasaApiResponse> => {
  const requestConfig = {
    params: { api_key: API_KEY, start_date: startDate, end_date: endDate },
  };
  return axios
    .get(`${NASA_API}/feed`, requestConfig)
    .then((response) => response.data);
};

const nasaApi = { getAsteroids };

export default nasaApi;
