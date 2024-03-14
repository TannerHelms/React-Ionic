import { IonAvatar } from "@ionic/react";

function Avatar({ src, size = "64px", alt }) {
  return (
    <IonAvatar style={{ width: size, height: size }}>
      <img src={src} alt={alt} />
    </IonAvatar>
  );
}

export default Avatar;
