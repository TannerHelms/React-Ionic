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
import { chatbox } from "ionicons/icons";
import { useSelector } from "react-redux";
import FirestoreApi from "../api/firestoreApi";
import { Details } from "../components/details";
import useInit from "../hooks/useInit";
import { getUser } from "../redux/details";

function UserDetails() {
  const { user: currUser, navigate } = useInit(true);
  const user = useSelector(getUser);

  const handleCreateMessage = async () => {
    await FirestoreApi.createChat(currUser.uid, user.uid);
    navigate.push("/app/chats", "root", "replace");
  };

  return (
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
        {user && currUser && (
          <>
            <div className="flex col w-full items-center h-full">
              <Details user={user} />
            </div>
            <div className="fixed bottom-20 right-20">
              <IonFab onClick={handleCreateMessage}>
                <IonFabButton color="blue">
                  <IonIcon icon={chatbox}></IonIcon>
                </IonFabButton>
              </IonFab>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default UserDetails;
