import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc, where, query, deleteDoc } from "firebase/firestore";
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
    static async getCollection(name, filter, filter2) {
        if (filter && filter2) {
            var q = query(collection(db, name), where(filter.match, filter.op, filter.value), where(filter2.match, filter2.op, filter2.value));
        }
        else if (filter) {
            var q = query(collection(db, name), where(filter.match, filter.op, filter.value));
        } else {
            var q = collection(db, name);
        }
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }

    // Get all the messages in a chat
    static async getMessages(chatId) {
        const messages = await this.getCollection("chat_messages", { match: "chat_id", op: "==", value: chatId });
        return messages.sort((a, b) => a.timestamp - b.timestamp);
    }

    // Get all the chats for a user
    static async getChats(userId) {
        const chats = await this.getCollection("chats", { match: 'userIds', op: "array-contains", value: userId }) || [];
        return chats.sort((a, b) => b.last_message_time - a.last_message_time);
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
    static async createChat(usera, userb) {

        // First need to check if there is a chat
        let collection = await this.getCollection("chats", { match: 'userIds', op: "array-contains", value: usera });
        let users = collection.filter(chat => chat.userIds.includes(userb));
        if (users.length > 0) {
            return
        }

        const newUuid = usera + userb;
        const timestamp = serverTimestamp();

        setDoc(doc(db, "chats", newUuid), {
            id: newUuid,
            user_a: doc(db, "users", usera),
            user_a_id: usera,
            user_b_id: userb,
            user_b: doc(db, "users", userb),
            users: [doc(db, "users", usera), doc(db, "users", userb)],
            userIds: [usera, userb],
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

    static async sendFriendRequest(user, friend) {
        // Check if they are already friends
        const resp = await this.getCollection("friend_requests", { match: "from", op: "==", value: user }, { match: "to", op: "==", value: friend });
        if (resp.length > 0) {
            return "Friend Request Already Sent"
        }
        const uuid = uuidv4().replace(/-/g, "");
        const timestamp = serverTimestamp();
        setDoc(doc(db, "friend_requests", uuid), {
            id: uuid,
            from: user,
            to: friend,
            timestamp,
        })
    }

    static async getSentFriendRequests(userId) {
        const requests = await this.getCollection("friend_requests", { match: "from", op: "==", value: userId });
        return requests.sort((a, b) => b.timestamp - a.timestamp);
    }

    static async getReceivedFriendRequests(userId) {
        const requests = await this.getCollection("friend_requests", { match: "to", op: "==", value: userId });
        return requests.sort((a, b) => b.timestamp - a.timestamp);
    }

    static async cancelFriendRequest(id) {
        await deleteDoc(doc(db, "friend_requests", id));
    }

    static async createFriendship(user, friend, request) {
        await this.cancelFriendRequest(request);

        const uuid = uuidv4().replace(/-/g, "");
        const timestamp = serverTimestamp();
        setDoc(doc(db, "friends", uuid), {
            id: uuid,
            userIds: [user, friend],
            timestamp,
        })
    }

    static async getFriends(userId) {
        return await this.getCollection("friends", { match: "userIds", op: "array-contains", value: userId });

    }

    static async deleteFriendship(id) {
        await deleteDoc(doc(db, "friends", id));
    }

}

export default FirestoreApi;