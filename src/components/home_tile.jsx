import { IonCard } from "@ionic/react";
import { useState } from "react";
import useInit from "../hooks/useInit";
import { setDetailUser } from "../redux/details";
import Button from "./button";
import { UserPhotos } from "./user_photos";

function HomeTile({ user, distance, idx }) {
  const { navigate, dispatch } = useInit(true);
  const [loading, setLoading] = useState(true);
  return (
    <IonCard
      key={idx}
      className="flex flex-col itme p-5 max-w-xl gap-3 opacity-100"
      style={{
        backgroundColor: "#C2CCBC",
        display: loading ? "none" : "flex",
      }}
    >
      <UserPhotos user={user} onLoad={() => setLoading(false)} />
      {/* User Info */}
      <div className="flex row between w-100 black">
        <p>{user.display_name}</p>
        <p>{distance}</p>
      </div>
      <div className="flex row between w-100 black">
        <p>{user.location}</p>
        <p>{user.is_host ? "Host" : "Traveler"}</p>
      </div>
      <Button
        text="View Profile"
        onClick={() => {
          delete user.created_time;
          dispatch(setDetailUser({ user }));
          navigate.push("/app/home/details");
        }}
      />
    </IonCard>
  );
}

export default HomeTile;
