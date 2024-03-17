import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import UserTile from "../components/user_tile";
import useDistanceBetween from "../hooks/useDistanceBetween";
import useInit from "../hooks/useInit";
import Spinner from "../components/spinner";
function Home() {
  const { user, dispatch } = useInit(true);
  const { userDistances } = useDistanceBetween(user);
  const body = (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="flex flex-col w-full items-center">
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
        </div>
        <Spinner state={!userDistances} />
      </IonContent>
    </IonPage>
  );
  return user ? body : null;
}

export default Home;
