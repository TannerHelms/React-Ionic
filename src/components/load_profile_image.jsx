import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import Avatar from "./avatar";

function LoadProfileImage({ src, hashsrc, size = 120 }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoading(false);
  }, [src]);

  return (
    <>
      <div className={loading ? "hidden" : "inline"}>
        <Avatar src={src} alt="photo" size={`${size}px`} />
      </div>
      <div className={loading ? "inline rounded  overflow-hidden" : "hidden"}>
        <Blurhash hash={hashsrc} width={size} height={size} />
      </div>
    </>
  );
}

export default LoadProfileImage;
