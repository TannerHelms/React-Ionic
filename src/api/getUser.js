import { collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

const getUser = async (userId) => {
    const user = await getDoc(doc(db, "users", userId));
    if (user.exists()) {
        return user.data();
    } else {
        return user;
    }
}
export default getUser;