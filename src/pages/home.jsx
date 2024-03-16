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
import { useEffect, useState } from "react";
function Home() {
  const { user, dispatch } = useInit(true);
  const { userDistances } = useDistanceBetween(user);
  const [loadingCounter, setLoadingCounter] = useState(0);

  useEffect(() => {
    console.log(loadingCounter);
    if (loadingCounter == userDistances?.length) {
      setLoadingCounter(null);
    }
  }, [loadingCounter]);

  const body = (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <div
            className={`flex flex-col items-center ${
              loadingCounter ? "hidden" : ""
            }`}
          >
            {userDistances?.map((data, idx) => {
              const { user, distance } = data;
              return (
                <UserTile
                  key={idx}
                  user={user}
                  distance={distance}
                  dispatch={dispatch}
                  onLoad={() => {
                    setLoadingCounter((old) => old + 1);
                  }}
                />
              );
            })}
          </div>
          {loadingCounter != null && (
            <FaSpinner className="spin flex w-full items-center" size="50px" />
          )}
        </IonContent>
      </IonPage>
    </>
  );
  return user ? body : null;
}

export default Home;
