import { IonContent, IonInput, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import Button from "../../components/button/button";
import useInit from "../../hooks/useInit";
import Input from "../../components/input/input";
import Avatar from "../../components/avatar/avatar";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LogIn() {
  const { navigate } = useInit();
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
    console.log(user);
    await signInWithEmailAndPassword(getAuth(), user.email, user.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
    //navigate.push("/app", "root", "replace");
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
          <Input
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
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
