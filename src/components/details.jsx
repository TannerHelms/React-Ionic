import React, { useEffect, useState } from "react";
import { UserPhotos } from "./user_photos";
import HouseRule from "./house_rule";

export function Details({ user, onLoad }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      onLoad();
    }
  }, [onLoad]);

  return (
    // Overall container

    <div className={`max-w-lg h-100 ${loading ? "hidden" : "block"}`}>
      {/* Container for Photos and details*/}
      <div className="flex col g-20 p-5">
        <UserPhotos user={user} onLoad={() => setLoading(false)} />
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
  );
}
