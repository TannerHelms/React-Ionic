import { doc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase-config";

const updateUserDoc = async (userId, data) => {
    const resp = await updateDoc(doc(db, "users", userId), {
        ...data
    });
    if (resp) {
        return null
    } else {
        return resp
    }
}

export default updateUserDoc;