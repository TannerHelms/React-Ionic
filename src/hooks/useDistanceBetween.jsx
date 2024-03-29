import { useEffect, useState } from "react";
import RadarApi from "../api/radarApi";
import useCollection from "./useCollection";

const useDistanceBetween = (user) => {
  const [userDistances, setUserDistances] = useState(null);
  const { data: users } = useCollection("users");

  const get = async () => {
    const newDist = await Promise.all(
      users.map(async (u) => {
        const { value, text } = await RadarApi.getDistance(user, u);
        return { user: u, distance: text, distanceNumber: value };
      })
    );
    newDist.sort((a, b) => a.distanceNumber - b.distanceNumber);
    setUserDistances(newDist);
  };

  useEffect(() => {
    if ((user && user.latitude && user.longitude, users)) {
      get();
    }
  }, [user, users]);

  return { userDistances };
};

export default useDistanceBetween;
