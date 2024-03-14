import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import Button from "../../components/button/button";
import { UserPhotos } from "../../components/user_photos/user_photos";
import useDistanceBetween from "../../hooks/useDistanceBetween";
import useInit from "../../hooks/useInit";
import { setDetailUser } from "../../redux/details";
import classes from "./home.module.css";

function Home() {
  const { user, token, navigate, dispatch } = useInit(true);
  const { userDistances } = useDistanceBetween(user);

  useEffect(() => {
    if (!user) {
      navigate.push("/", "root", "replace");
    }
  }, [user]);

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* End Header */}

      {/* Content */}
      <IonContent fullscreen>
        <div className="flex col centery">
          {userDistances?.map((data, idx) => {
            const { user, distance } = data;
            return (
              <IonCard key={idx} className={classes.card}>
                <UserPhotos user={user} />
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
          })}
          {!userDistances && <FaSpinner className="spin" size={"50px"} />}
        </div>
      </IonContent>
      {/* End Content */}
    </IonPage>
  );
}

export default Home;

{
  /* <IonButton expand="full" routerLink="/app/home/details">
          Details
        </IonButton> */
}
