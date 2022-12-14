import { useState } from "react";
import { NearEarthObjectTableData } from "../../types/Nasa";
import nasasterApi from "../../services/nasasterApi";

function useAsteroid() {
  const [asteroids, setAsteroids] = useState<NearEarthObjectTableData[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchAsteroids = async (startDate: string, endDate: string) => {
    setLoading(true);
    setError(undefined);

    try {
      const asteroidsFromApi = await nasasterApi.getAsteroids(
        startDate,
        endDate
      );
      // Pick some fields from objects
      const objectsSorted = Object.values(
        asteroidsFromApi.data.near_earth_objects
      )
        .map((objects) => {
          // Pick
          const pickedObjects: NearEarthObjectTableData[] = objects.map(
            (object) => {
              const {
                id,
                name,
                close_approach_data: closeApproachData,
              } = object;
              const {
                close_approach_date: closeApproachDate,
                miss_distance: missDistance,
              } = closeApproachData[0];
              const { kilometers } = missDistance;
              return {
                id,
                name,
                close_approach_date: closeApproachDate,
                kilometers: Number(kilometers),
              };
            }
          );
          return pickedObjects;
        })
        .reduce((prev, curr) => [...prev, ...curr], [])
        .sort((a, b) => a.kilometers - b.kilometers);

      setLoading(false);
      setAsteroids(objectsSorted);
    } catch (err) {
      setLoading(false);
      const { message } = err as unknown as { message: string };
      setError(message);
    }
  };

  return { asteroids, fetchAsteroids, loading, error };
}

export default useAsteroid;
