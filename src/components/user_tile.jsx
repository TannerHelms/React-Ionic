import { IonCard } from "@ionic/react";
import useInit from "../hooks/useInit";
import { setDetailUser } from "../redux/details";
import Button from "./button";
import { UserPhotos } from "./user_photos";

function UserTile({ user, distance, onLoad }) {
  const { navigate, dispatch } = useInit(true);

  return (
    <IonCard
      className="flex flex-col itme p-5 max-w-xl gap-3 opacity-100 fade-in"
      style={{ backgroundColor: "#C2CCBC" }}
    >
      <UserPhotos user={user} onLoad={onLoad} />
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
          navigate.push("/user/details");
        }}
      />
    </IonCard>
  );
}

export default UserTile;
