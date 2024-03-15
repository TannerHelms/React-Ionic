import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";

const useCollection = (name) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const get = async () => {
      const newData = [];
      const querySnapshot = await getDocs(collection(db, name));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newData.push(data);
      });
      
      setData(newData);
    };
    get();
  }, []);
  return { data };
};

export default useCollection;
