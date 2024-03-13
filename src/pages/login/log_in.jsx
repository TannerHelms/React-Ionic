import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonGrid,
} from "@ionic/react";
import useInit from "../../hooks/useInit";
import { useState } from "react";
import classes from "./log_in.module.css";
import Button from "../../components/button/button";
function LogIn() {
  const { navigate } = useInit();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Content Container */}
        {/* Email Input */}
        <div className="flex col centerx centery w-100 h-100 p-20 g-20">
          <IonInput
            type="email"
            label="Enter Email"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Email"
          ></IonInput>
          <Button
            text="Log in"
            onClick={() => navigate.push("/app", "root", "replace")}
          />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default LogIn;
