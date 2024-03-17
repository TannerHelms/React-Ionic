import React from "react";
import LoadBackground from "./load_background";
import LoadProfileImage from "./load_profile_image";
export function UserPhotos({ user }) {
  return (
    <>
      <div className="relative mb-12">
        <LoadBackground
          src={user.photo_background}
          hashsrc={user.background_hash}
        />
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{ bottom: "-60px" }}
        >
          <LoadProfileImage src={user.photo_url} hashsrc={user.profile_hash} />
        </div>
      </div>
    </>
  );
}
