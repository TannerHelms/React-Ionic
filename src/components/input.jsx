import React from "react";
import { IonInput } from "@ionic/react";

const Input = ({ label, ...props }) => {
  return (
    <IonInput
      className="bg-white"
      labelPlacement="floating"
      fill="outline"
      label={label}
      placeholder={label}
      {...props}
    ></IonInput>
  );
};

export default Input;
