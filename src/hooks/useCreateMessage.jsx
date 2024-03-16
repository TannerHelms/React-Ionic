import { collection, doc, setDoc } from "firebase/firestore";
import useCollection from "./useCollection";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { v4 as uuidv4 } from "uuid";
// Function to create a new message in Firestore
function useCreateMessage({ user, message, chatId, send }) {
  const [resp, setResp] = useState({ message: "" });

  useEffect(() => {
    const create = async () => {
      const newUuid = uuidv4();

      // await setDoc(doc(db, "chat_messages", `${newUuid}`), {
      //   text: message,
      //   timstamp: Date.now(),
      //   user: user.uid,
      // });
      setResp({ message: "created message" });
    };
    if (send) {
      create();
    }
  }, [send]);

  return { resp };
}

export default useCreateMessage;
