import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FirestoreApi from "../api/firestoreApi";


const handleSignIn = async (data) => {
    try {
        const userCredential = await signInWithEmailAndPassword(getAuth(), data.email, data.password);
        const { uid } = userCredential.user;
        const token = userCredential._tokenResponse.refreshToken;
        const user = await FirestoreApi.getUser(uid);
        if (user) {
            return { user, token };
        }
        throw new Error("Invalid Credentials");
    } catch (error) {
        console.error(error);
        return { error };
    }
};

export default handleSignIn;