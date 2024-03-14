import React from "react";
import classes from "./user_photos.module.css";
import Avatar from "../avatar/avatar";
export function UserPhotos({ user, size = "140" }) {
  return (
    <>
      {/* Photos */}
      <div className="relative">
        <img className={classes.cover} src={user.photo_background} alt="" />
        <div className={classes.avatar}>
          <Avatar src={user.photo_url} alt="photo" size={`${size}px`} />
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
