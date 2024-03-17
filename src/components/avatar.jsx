import { IonAvatar } from "@ionic/react";
import { useEffect, useState } from "react";

function Avatar({ src, size = "64px", alt, circle = true, onLoad }) {
  return (
    <IonAvatar style={{ width: size, height: size }}>
      <img
        src={src}
        alt={alt}
        style={{ width: size, height: size }}
        onLoad={() => {
          if (onLoad) {
            onLoad();
          }
        }}
      />
    </IonAvatar>
  );
}

export default Avatar;
