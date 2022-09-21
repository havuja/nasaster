export type NearEarthObject = Record<string, unknown[]>;

export type NasaApiResponse = {
  element_count: number;
  near_earth_objects: NearEarthObject;
};
