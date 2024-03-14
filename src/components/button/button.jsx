import { IonButton } from "@ionic/react";
import classes from "./button.module.css";
import { useEffect, useState } from "react";

function Button({ text, onClick }) {
  return (
    <IonButton className={classes.button} onClick={onClick}>
      <p>{text}</p>
    </IonButton>
  );
}

export default Button;
