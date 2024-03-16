import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import getUser from "./getUser";

const handleSignIn = async (data) => {
    try {
        const userCredential = await signInWithEmailAndPassword(getAuth(), data.email, data.password);
        const { uid } = userCredential.user;
        const token = userCredential._tokenResponse.refreshToken;
        const user = await getUser(uid);
        delete user.created_time;
        if (user) {
            return { user, token };
        }
        throw new Error("Invalid Credentials");
    } catch (error) {
        return { error };
    }
};

export default handleSignIn;