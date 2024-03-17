import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/firebase-config";
import FirestoreApi from "../api/firestoreApi";
// Function to create a new message in Firestore
function useCreateMessage({ user, message, chatId, send, setState }) {
  const [resp, setResp] = useState({ message: "" });

  useEffect(() => {
    const create = async () => {
      await FirestoreApi.createMessage(chatId, user, message);
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
