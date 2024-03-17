import { IonAvatar } from "@ionic/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Avatar({ src, placeholder = "", size = "64px", alt }) {
  return (
    <IonAvatar style={{ width: size, height: size }}>
      <img src={src} alt={alt} style={{ width: size, height: size }} />
    </IonAvatar>
  );
}

export default Avatar;
