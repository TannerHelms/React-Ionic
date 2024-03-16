import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { Details } from "../components/details";
import { getUser } from "../redux/details";
import { add, chatbox } from "ionicons/icons";

function HomeDetails() {
  const user = useSelector(getUser);

  const body = (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/app/home"></IonBackButton>
            </IonButtons>
            <IonTitle>User Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="secondary" fullscreen>
          <div className="flex col w-full items-center h-full">
            <Details user={user} />
            {/* <IonFab>
              <IonFabButton>
                <IonIcon icon={chatbox}></IonIcon>
              </IonFabButton>
            </IonFab> */}
          </div>
        </IonContent>
      </IonPage>
    </>
  );

  return user ? body : null;
}

export default HomeDetails;
