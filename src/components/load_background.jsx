import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

function LoadBackground({ src, hashsrc, size = 400 }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoading(false);
  }, [src]);

  return (
    <>
      <div className={loading ? "hidden" : "inline"}>
        <img className="rounded-lg aspect-square object-cover" src={src} />
      </div>
      <div
        className={
          loading ? "inline overflow-hidden rounded-lg w-30" : "hidden"
        }
      >
        <Blurhash hash={hashsrc} width={size} height={size} />
      </div>
    </>
  );
}

export default LoadBackground;
