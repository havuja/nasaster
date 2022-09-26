export type CloseApproachData = {
  close_approach_date: string;
  miss_distance: { kilometers: string };
};

export type NearEarthObject = {
  id: string;
  name: string;
  close_approach_data: CloseApproachData[];
};

export type NasaData = {
  element_count: number;
  near_earth_objects: Record<string, NearEarthObject[]>;
};

export type NasasterApiResponse = {
  response: string;
  data: NasaData;
};

export type NearEarthObjectTableData = {
  id: NearEarthObject["id"];
  name: NearEarthObject["name"];
  close_approach_date: CloseApproachData["close_approach_date"];
  kilometers: number;
};
