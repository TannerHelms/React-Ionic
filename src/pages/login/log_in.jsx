import { IonContent, IonPage } from "@ionic/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "../../components/avatar/avatar";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import getUser from "../../hooks/getUser";
import useInit from "../../hooks/useInit";
import { setCredentials } from "../../redux/auth";

function LogIn() {
  const { navigate, dispatch } = useInit({ auth: false });
  const [error, setError] = useState(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  const signIn = async () => {
    signInWithEmailAndPassword(getAuth(), user.email, user.password)
      .then(async (userCredential) => {
        const { uid } = userCredential.user;
        const token = userCredential._tokenResponse.refreshToken;
        const user = await getUser(uid);
        delete user.created_time;
        if (user) {
          dispatch(setCredentials({ user, token }));
          navigate.push("/app", "root", "replace");
        } else {
          console.log("there was an error");
        }
      })
      .catch((error) => {
        setError("Invalid Credentials");
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Content Container */}
        {/* Email Input */}
        <div className="flex col centerx centery w-100 h-100 p-20 g-20">
          <Avatar
            src="https://firebasestorage.googleapis.com/v0/b/saint-seeing-5d426.appspot.com/o/saint_seeing_logo.png?alt=media&token=655134ad-bc31-4232-b02b-dfb82019584d"
            alt="logo"
            size="120px"
          />
          <h1>Log In</h1>
          {error && <p className="red">{error}</p>}
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleChange}
            value={user.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleChange}
            value={user.password}
          />
          <p className="w-100 right pointer">Forgot Password?</p>
          <Button text="Log in" onClick={signIn} />
          <div className="flex row g-10">
            <p>Don't have account?</p>
            <p className="pointer">Sign Up</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default LogIn;
