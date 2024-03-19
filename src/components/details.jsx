import React from "react";
import HouseRule from "./house_rule";
import { UserPhotos } from "./user_photos";
import { FaUserFriends } from "react-icons/fa";

export function Details({ user }) {
  return (
    <>
      <div className="max-w-lg fade-in">
        {/* Container for Photos and details*/}
        <div className="flex col g-20 p-5">
          <UserPhotos user={user} />
          {/* User Info */}
          <div className="flex row between w-100 black">
            <h2 className="black center">{user.display_name}</h2>
            <div className="flex flex-row gap-2 items-center">
              <FaUserFriends size={25} />
              {user.friendCt}
            </div>
          </div>

          <div className="flex row between w-100 black">
            <p>{user.location}</p>
            <p>{user.is_host ? "Host" : "Traveler"}</p>
          </div>
        </div>

        {/* User Details */}
        <div className="flex col g-20 w-full p-5 rounded-t-2xl min-h-72 color-background">
          <h2 className="black left">Bio</h2>
          <p className="black">{user.bio}</p>
          <h2 className="black left">House Rules</h2>
          {user.house_rules?.map((rule, idx) => {
            return <HouseRule key={idx} idx={idx} rule={rule} />;
          })}
        </div>
      </div>
    </>
  );
}
