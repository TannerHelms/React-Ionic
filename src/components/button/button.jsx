import { IonButton } from "@ionic/react";
import classes from "./button.module.css";
import { useEffect, useState } from "react";

function Button({ text, onClick }) {
  return (
    <IonButton className="w-100" expand="full" onClick={onClick}>
      {text}
    </IonButton>
  );
}

export default Button;
