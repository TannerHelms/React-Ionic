import { IonCard } from "@ionic/react";
import { useEffect, useState } from "react";
import useInit from "../hooks/useInit";
import { setDetailUser } from "../redux/details";
import { UserPhotos } from "./user_photos";
import Button from "./button";

function UserTile({ user, distance, onLoad }) {
  const { navigate, dispatch } = useInit(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      onLoad();
    }
  }, [loading]);

  return (
    <IonCard
      className="flex flex-col itme p-5 max-w-xl gap-3 opacity-100"
      style={{
        backgroundColor: "#C2CCBC",
        display: loading ? "none" : "flex",
      }}
    >
      <UserPhotos user={user} onLoad={() => setLoading(false)} />
      {/* User Info */}
      <div className="flex row between w-100 black mt-3">
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

export default UserTile;
