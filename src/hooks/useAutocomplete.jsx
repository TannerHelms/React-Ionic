import Radar from "radar-sdk-js";
import { useEffect, useState } from "react";
import RadarApi from "../api/radarApi";

const useAutocomplete = ({ user, query, search }) => {
  const [addresses, setAddresses] = useState(null);

  useEffect(() => {
    if (!search) {
      setAddresses(false);
    }
    const delayDebounceFn = setTimeout(() => {
      if (search && user && query) {
        const get = async () => {
          const resp = await RadarApi.autoComplete(query, user);
          if (resp.addresses) {
            setAddresses(resp.addresses);
          }
        };
        get();
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [user, query, search]);

  return { addresses };
};

export default useAutocomplete;
