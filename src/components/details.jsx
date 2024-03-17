import React from "react";
import HouseRule from "./house_rule";
import { UserPhotos } from "./user_photos";

export function Details({ user }) {
  return (
    <>
      <div className="fade-in">
        <div className="max-w-lg h-100">
          {/* Container for Photos and details*/}
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
            className="flex col g-20 w-full p-5 rounded-t-2xl "
            style={{ backgroundColor: "#eef2f3" }}
            color="secondary"
          >
            <h2 className="black left">Bio</h2>
            <p className="black">{user.bio}</p>
            <h2 className="black left">House Rules</h2>
            {user.house_rules?.map((rule, idx) => {
              return <HouseRule key={idx} idx={idx} rule={rule} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
