import React, { useEffect, useState } from "react";
import classes from "./user_photos.module.css";
import Avatar from "../avatar/avatar";
export function UserPhotos({ user, size = "140", onLoad }) {
  const [loadingCover, setLoadingCover] = useState(true);
  const [loadingAvatar, setLoadingAvatar] = useState(true);

  useEffect(() => {
    if (onLoad && !loadingCover && !loadingAvatar) {
      onLoad();
    }
  }, [loadingCover, loadingAvatar]);

  return (
    <>
      {/* Photos */}
      <div className="relative">
        <img
          className={classes.cover}
          src={user.photo_background}
          alt=""
          onLoad={() => {
            setLoadingCover(false);
          }}
        />
        <div className={classes.avatar}>
          <Avatar
            src={user.photo_url}
            alt="photo"
            size={`${size}px`}
            onLoad={() => {
              setLoadingAvatar(false);
            }}
          />
        </div>
      </div>
      <div
        style={{
          height: `${size / 4}px`,
        }}
      ></div>
    </>
  );
}
