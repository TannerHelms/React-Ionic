import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import ChatTile from "../../components/chat_tile";
import useCollection from "../../hooks/useCollection";
import useInit from "../../hooks/useInit";
import { setChat } from "../../redux/chat";

function Messages() {
  const { user, navigate, dispatch } = useInit(true);
  const { data: chats } = useCollection("chats");

  const body = (
    <>
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
            {!chats && <FaSpinner className="spin" size={"50px"} />}
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
    </>
  );

  return user ? body : null;
}
export default Messages;
