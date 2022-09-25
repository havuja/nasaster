export type NearEarthObject = {
  id: string;
  name: string;
  close_approach_data: unknown[];
};

export type NearEarthObjectsPerDay = Record<string, NearEarthObject[]>;

export type NasaApiResponse = {
  element_count: number;
  near_earth_objects: NearEarthObjectsPerDay;
};
