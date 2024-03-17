import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/firebase-config";


const CreateChat = async (usera, userb) => {
    try {

        const newUuid = usera + userb;

        const timestamp = serverTimestamp();

        await setDoc(doc(db, "chats", newUuid), {
            chat_group_id: newUuid,
            user_a: doc(db, "users", usera),
            user_b: doc(db, "users", userb),
            users: [doc(db, "users", usera), doc(db, "users", userb)],
            last_message: "Chat Created",
            last_message_time: timestamp,
            timestamp,
        });

        return { success: true }
    } catch (error) {
        return { error: error.message };
    }
}

export default CreateChat;