import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import Avatar from "../../components/avatar/avatar";
import Button from "../../components/button/button";
import useCollection from "../../hooks/useCollection";
import useInit from "../../hooks/useInit";
import classes from "./home.module.css";
import { getDistance } from "../../hooks/getDistance";

function Home() {
  const { user, token, navigate } = useInit(true);
  const { data: users } = useCollection("users");
  const [distance, setDistances] = useState([]);

  useEffect(() => {
    if (users && user) {
      const get = async () => {
        users.forEach(async (u) => {
          const dist = await getDistance(
            user.latitude,
            user.longitude,
            u.latitude,
            u.longitude
          );
        });
      };
      get();
    }
  }, [user, users]);

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
          {users?.map((user, idx) => {
            return (
              <IonCard key={idx} className={classes.card}>
                {/* Photos */}
                <div className="relative">
                  <img
                    className={classes.cover}
                    src={user.photo_background}
                    alt=""
                  />
                  <div className={classes.avatar}>
                    <Avatar src={user.photo_url} alt="photo" size="140px" />
                  </div>
                </div>
                <div style={{ height: "30px" }}></div>
                {/* User Info */}
                <div className="flex row between w-100 black">
                  <p>{user.display_name}</p>
                  <p>0ft</p>
                </div>
                <div className="flex row between w-100 black">
                  <p>{user.location}</p>
                  <p>{user.is_host ? "Host" : "Traveler"}</p>
                </div>
                <Button text="View Profile" />
              </IonCard>
            );
          })}
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
