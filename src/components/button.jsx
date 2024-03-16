import React from "react";
import { IonButton } from "@ionic/react";

const Button = ({ text, ...props }) => {
  return (
    <IonButton {...props} className="text-black text-lg w-full">
      {text}
    </IonButton>
  );
};

export default Button;
