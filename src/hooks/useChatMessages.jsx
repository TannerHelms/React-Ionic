import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { useSelector } from "react-redux";
import { selectChatId, selectChatUid } from "../redux/chat";

const useChatMesages = () => {
  const [data, setData] = useState(null);
  const chatId = useSelector(selectChatId);
  const chatUid = useSelector(selectChatUid);
  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      const chatRef = await getDoc(doc(db, "chats", chatUid));
      const chat = chatRef.data().chat_group_id;
      const querySnapshot = await getDocs(collection(db, "chat_messages"));

      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          if (chat === chatId) {
            newData.push(doc.data());
          }
        })
      );

      newData.sort((a, b) => a.timestamp - b.timestamp);
      setData(newData);
    };
    if (chatId && chatUid) {
      fetchData();
    }
  }, [chatId, chatUid]);

  return { data, setData };
};

export default useChatMesages;
