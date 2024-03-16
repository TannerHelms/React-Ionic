import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FaSpinner } from "react-icons/fa";
import useDistanceBetween from "../hooks/useDistanceBetween";
import useInit from "../hooks/useInit";
import UserTile from "../components/user_tile";
function Home() {
  const { user, dispatch } = useInit(true);
  const { userDistances } = useDistanceBetween(user);

  const body = (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <div className="flex flex-col items-center">
            {userDistances?.map((data, idx) => {
              const { user, distance } = data;
              return (
                <UserTile
                  key={idx}
                  user={user}
                  distance={distance}
                  dispatch={dispatch}
                />
              );
            })}
            {!userDistances && <FaSpinner className="spin" size="50px" />}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
  return user ? body : null;
}

export default Home;
