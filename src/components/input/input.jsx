import { IonInput } from "@ionic/react";
import classes from "./input.module.css";

function Input({ name, placeholder, type = "text", onChange, value }) {
  return (
    <IonInput
      class={`${classes.input} bg-white`}
      name={name}
      type={type}
      label={placeholder}
      labelPlacement="floating"
      fill="outline"
      placeholder={placeholder}
      onIonInput={onChange}
      value={value ? value : ""}
    ></IonInput>
  );
}

export default Input;
