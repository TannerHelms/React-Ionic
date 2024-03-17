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
import useInit from "../hooks/useInit";
import { bluetooth, chatbox } from "ionicons/icons";
import CreateChat from "../api/createChat";

function UserDetails() {
  const { user: currUser, navigate } = useInit(true);
  const user = useSelector(getUser);

  const handleCreateMessage = async () => {
    const resp = await CreateChat(currUser.uid, user.uid);
    if (resp.success) {
      navigate.push("/app/messages", "root", "replace");
    } else {
      console.log(resp.error);
    }
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
