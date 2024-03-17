import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/firebase-config";
// Function to create a new message in Firestore
function useCreateMessage({ user, message, chatId, send, setState }) {
  const [resp, setResp] = useState({ message: "" });

  useEffect(() => {
    const create = async () => {
      const newUuid = uuidv4().replace(/-/g, "");

      const timestamp = serverTimestamp();

      await setDoc(doc(db, "chat_messages", newUuid), {
        chat: doc(db, "chats", chatId),
        text: message,
        timestamp,
        user: doc(db, "users", user.uid),
        chat_id: chatId,
      });
      console.log(chatId);
      await updateDoc(doc(db, "chats", chatId), {
        last_message: message,
        last_message_time: timestamp,
      });
      setState("");
      setResp({ message: "created message" });
    };
    if (send) {
      create();
    }
  }, [send]);

  return { resp };
}

export default useCreateMessage;
