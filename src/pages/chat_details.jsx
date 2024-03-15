import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { useSelector } from "react-redux";
import Avatar from "../components/avatar/avatar";
import useChatMesages from "../hooks/useChatMessages";
import useInit from "../hooks/useInit";
import { selectChatId, selectUser } from "../redux/chat";
import { useEffect } from "react";
import MessageTile from "../components/message_tile";
function ChatDetails() {
  const { user, token, navigate, dispatch } = useInit(true);
  const chatId = useSelector(selectChatId);
  const userB = useSelector(selectUser);
  const { data: messages } = useChatMesages(chatId);

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/messages"></IonBackButton>
          </IonButtons>
          <div className="flex flex-row gap-3 items-center">
            <Avatar src={userB.photo_url} size="40px" />
            <p className="text-xl">{userB.display_name}</p>
          </div>
        </IonToolbar>
      </IonHeader>
      {/* End Header */}
      {/* Content */}
      <IonContent fullscreen>
        <div
          className="h-full flex flex-col justify-end p-5
        "
        >
          {messages?.map((message, idx) => {
            return <MessageTile key={idx} message={message} />;
          })}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ChatDetails;
