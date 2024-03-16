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
import useLoading from "../hooks/useLoading";
function Home() {
  const { user, dispatch } = useInit(true);
  const { userDistances } = useDistanceBetween(user);
  const { loadClass, load, Spinner } = useLoading(userDistances?.length, {
    size: "32px",
  });

  const body = (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <div className={loadClass}>
            <div className="flex flex-col w-full items-center">
              {userDistances?.map((data, idx) => {
                const { user, distance } = data;
                return (
                  <UserTile
                    key={idx}
                    user={user}
                    distance={distance}
                    dispatch={dispatch}
                    onLoad={load}
                  />
                );
              })}
            </div>
          </div>
          {Spinner}
        </IonContent>
      </IonPage>
    </>
  );
  return user ? body : null;
}

export default Home;
