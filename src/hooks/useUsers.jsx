import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";

function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const get = async () => {
      const newUsers = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log({ user: data });
        newUsers.push({ user: data });
      });
      setUsers(newUsers);
    };
    get();
  }, []);

  return { users };
}

export default useUsers;
