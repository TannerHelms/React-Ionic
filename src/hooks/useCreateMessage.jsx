import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import useCollection from "./useCollection";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { v4 as uuidv4 } from "uuid";
// Function to create a new message in Firestore
function useCreateMessage({ user, message, chatId, send }) {
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
      });
      setResp({ message: "created message" });
    };
    if (send) {
      create();
    }
  }, [send]);

  return { resp };
}

export default useCreateMessage;
