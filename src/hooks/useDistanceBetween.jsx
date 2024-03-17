import { useEffect, useState } from "react";
import useCollection from "./useCollection";
import getDistance from "../utils/getDistance";

const useDistanceBetween = (user) => {
  const [userDistances, setUserDistances] = useState(null);
  const { data: users } = useCollection("users");

  const get = async () => {
    let newDist = [];
    await Promise.all(
      users.map(async (u) => {
        const { value, text } = await getDistance(
          user.latitude,
          user.longitude,
          u.latitude,
          u.longitude
        );
        newDist.push({ user: u, distance: text, distanceNumber: value });
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
