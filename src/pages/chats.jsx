import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ChatTile from "../components/chat_tile";
import useGetChats from "../hooks/useGetChats";
import useInit from "../hooks/useInit";

function Chats() {
  const { user } = useInit(true);
  const chats = useGetChats(user?.uid);

  const body = (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Chats</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* End Header */}
      {/* Content */}
      <IonContent fullscreen>
        <div className="flex flex-col gap-3 p-5 items-center">
          <div className="w-full max-w-xl flex flex-col gap-4">
            <p>Below are your chats</p>
            {chats?.map((chat, idx) => {
              return <ChatTile key={idx} user={user} chat={chat} />;
            })}
          </div>
        </div>
      </IonContent>
      {/* End Content */}
    </IonPage>
  );

  return user ? body : null;
}
export default Chats;
