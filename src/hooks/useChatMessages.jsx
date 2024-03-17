import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FirestoreApi from "../api/firestoreApi";
import { selectChatId } from "../redux/chat";

const useChatMesages = () => {
  const [data, setData] = useState(null);
  const chatId = useSelector(selectChatId);
  useEffect(() => {
    const fetchData = async () => {
      const data = await FirestoreApi.getMessages(chatId);
      setData(data);
    };
    if (chatId) {
      fetchData();
    }
  }, [chatId]);

  return { data, setData };
};

export default useChatMesages;
