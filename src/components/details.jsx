import React from "react";
import { UserPhotos } from "./user_photos";

export function Details({ user }) {
  return (
    <div className={`flex col w-100 centery h-100`}>
      <div className="max-w-lg h-full">
        <div className="flex col g-20 p-5">
          <UserPhotos user={user} />
          {/* User Info */}
          <h2 className="black center">{user.display_name}</h2>
          <div className="flex row between w-100 black">
            <p>{user.location}</p>
            <p>{user.is_host ? "Host" : "Traveler"}</p>
          </div>
        </div>
        {/* User Details */}
        <div
          className="flex col g-20 w-full p-5 rounded-t-2xl"
          style={{ backgroundColor: "#eef2f3" }}
        >
          <h2 className="black left">Bio</h2>
          <p className="black">{user.bio}</p>
          <h2 className="black left">House Rules</h2>
          {user.house_rules?.map((rule, idx) => {
            return (
              <p key={idx} className="black">
                {idx + 1} {rule}
              </p>
            );
          })}
          <div
            style={{
              height: "10px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
