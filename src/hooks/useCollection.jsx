import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import FirestoreApi from "../api/firestoreApi";

const useCollection = (name) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const get = async () => {
      const data = await FirestoreApi.getCollection(name);
      setData(data);
    };
    get();
  }, []);
  return { data };
};

export default useCollection;
