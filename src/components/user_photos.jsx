import React, { useEffect, useState } from "react";
import Avatar from "./avatar";
import useLoading from "../hooks/useLoading";
export function UserPhotos({ user, size = "140", onLoad }) {
  const { load } = useLoading(2, { onLoad });
  return (
    <>
      <div className="relative">
        <img
          className="rounded-lg aspect-square object-cover"
          src={user.photo_background}
          alt=""
          onLoad={load}
        />
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{ bottom: "-60px" }}
        >
          <Avatar
            src={user.photo_url}
            alt="photo"
            size={`${size}px`}
            onLoad={load}
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
