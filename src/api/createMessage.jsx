import { collection } from "firebase/firestore";
import useCollection from "../hooks/useCollection";

// Function to create a new message in Firestore
function useCreateMessage({ user, message, chatId }) {
  const messagesCollection = useCollection("messages");
  //   const newMessageDoc = messagesCollection.doc();
  //   newMessageDoc
  //     .set({
  //       user1: user.uid,
  //       message: message,
  //       chat: chatId,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     })
  //     .then(() => {
  //       console.log("New message created successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error creating new message:", error);
  //     });
}

export default useCreateMessage;
