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
import { personAdd } from "ionicons/icons";
import { useSelector } from "react-redux";
import FirestoreApi from "../api/firestoreApi";
import { Details } from "../components/details";
import useInit from "../hooks/useInit";
import { getUser } from "../redux/details";
import useToast from "../components/use_toast";
import { useEffect, useState } from "react";

function UserDetails() {
  const { user: currUser, navigate } = useInit(true);
  const user2 = useSelector(getUser);
  const [user, setUser] = useState(null);
  console.log(user);
  const toast = useToast();

  useEffect(() => {
    const get = async () => {
      const friends = await FirestoreApi.getFriends(user2.uid);

      setUser({
        ...user2,
        friendCt: friends.length,
      });
    };
    get();
  }, [user2]);

  const handleCreateMessage = async () => {
    await FirestoreApi.createChat(currUser.uid, user.uid);
    navigate.push("/app/chats", "root", "replace");
  };

  const handleSendChatRequest = async () => {
    toast("Sent Friend Request");
    const resp = await FirestoreApi.sendFriendRequest(currUser.uid, user.uid);
    if (resp) {
      console.log(resp);
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
              <IonFab onClick={handleSendChatRequest}>
                <IonFabButton color="blue">
                  <IonIcon icon={personAdd}></IonIcon>
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
