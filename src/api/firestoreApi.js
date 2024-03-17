import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/firebase-config";
import { setCredentials } from "../redux/auth";

class FirestoreApi {
    // Creates a new message in the firestore database and update the last message in the chat
    static createMessage(chatId, user, message) {
        const docId = uuidv4().replace(/-/g, "");
        const timestamp = serverTimestamp();

        setDoc(doc(db, "chat_messages", docId), {
            id: docId,
            chat: doc(db, "chats", chatId),
            text: message,
            timestamp,
            user: doc(db, "users", user.uid),
            user_id: user.uid,
            chat_id: chatId,
        });


        updateDoc(doc(db, "chats", chatId), {
            last_message: message,
            last_message_time: timestamp,
        });
    }

    // Get a collection 
    static async getCollection(name) {
        const querySnapshot = await getDocs(collection(db, name));
        return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }

    // Get all the messages in a chat
    static async getMessages(chatId) {
        const collection = await this.getCollection("chat_messages");
        const messages = collection.filter(message => message.chat_id === chatId);
        return messages.sort((a, b) => a.timestamp - b.timestamp);
    }

    // Get all the chats for a user
    static async getChats(userId) {
        const collection = await this.getCollection("chats");
        const chats = collection.filter(chat => chat.user_a_id === userId || chat.user_b_id === userId);
        return chats.sort((a, b) => a.timestamp - b.timestamp);
    }

    // Get a user 
    static async getUser(userId) {
        let user = await getDoc(doc(db, "users", userId));
        user = user.data();
        delete user.created_time;
        return user;
    }

    // update a user 
    static updateUser(id, data) {
        updateDoc(doc(db, "users", id), {
            ...data
        });
    }

    // Create a chat between 2 users
    static createChat(usera, userb) {
        const newUuid = usera + userb;
        const timestamp = serverTimestamp();

        setDoc(doc(db, "chats", newUuid), {
            id: newUuid,
            user_a: doc(db, "users", usera),
            user_a_id: usera,
            user_b_id: userb,
            user_b: doc(db, "users", userb),
            users: [doc(db, "users", usera), doc(db, "users", userb)],
            last_message: "Chat Created",
            last_message_time: timestamp,
            timestamp,
        });
    }

    // Sign in a user
    static async signIn(dispatch, email, password) {
        const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
        const { uid } = userCredential.user;
        const token = userCredential._tokenResponse.refreshToken;
        const user = await FirestoreApi.getUser(uid);
        dispatch(setCredentials({ user, token }));
    }
}

export default FirestoreApi;