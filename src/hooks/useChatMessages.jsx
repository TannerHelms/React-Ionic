import { collection, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";

const useChatMesages = (chatId) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      const collectionRef = collection(db, "chat_messages");
      const querySnapshot = await getDocs(collectionRef);
      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const docData = doc.data();
          const chat = await getDoc(docData.chat).then((chat) => chat.data());
          if (chat.chat_group_id === chatId) {
            newData.push(docData);
          }
        })
      );
      newData.sort((a, b) => a.timestamp - b.timestamp);
      setData(newData);
    };

    fetchData();
  }, [chatId]);

  return { data, setData };
};

export default useChatMesages;
