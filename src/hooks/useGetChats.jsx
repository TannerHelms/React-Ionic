import { useEffect, useState } from "react";
import FirestoreApi from "../api/firestoreApi";

function useGetChats(userId) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const get = async () => {
      const resp = await FirestoreApi.getChats(userId);
      setChats(resp);
    };
    if (userId) {
      get();
    }
  }, [userId]);

  return chats;
}

export default useGetChats;
