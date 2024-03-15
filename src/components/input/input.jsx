import { IonInput } from "@ionic/react";

function Input(props) {
  return (
    <IonInput
      className="bg-white"
      labelPlacement="floating"
      fill="outline"
      name="email"
      type={props.type}
      label={props.label}
      placeholder={props.label}
      {...props}
    />
  );
}

export default Input;
