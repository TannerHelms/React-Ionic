import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { addCircleOutline, send } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../components/avatar";
import MessageTile from "../components/message_tile";
import useChatMesages from "../hooks/useChatMessages";
import useInit from "../hooks/useInit";
import { selectChatId, selectUser } from "../redux/chat";
import useCreateMessage from "../hooks/useCreateMessage";
function ChatDetails() {
  const { user, token, navigate, dispatch } = useInit({ auth: true });
  const chatId = useSelector(selectChatId);
  const userB = useSelector(selectUser);
  const { data: messages } = useChatMesages(chatId);
  const [newMessage, setNewMessage] = useState();
  const [create, setCreate] = useState(false);
  const { resp } = useCreateMessage({
    user,
    message: newMessage,
    chatId,
    send: create,
  });

  const handleCreateMessage = () => {
    setCreate(true);
  };

  useEffect(() => {
    if (resp?.message) {
      console.log(resp?.message);
      setCreate(false);
    }
  }, [resp]);

  const body = (
    <>
      <IonPage>
        {/* Header */}
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/app/messages"></IonBackButton>
            </IonButtons>
            <div className="flex flex-row gap-3 items-center">
              <Avatar src={userB?.photo_url} size="40px" />
              <p className="text-xl">{userB?.display_name}</p>
            </div>
          </IonToolbar>
        </IonHeader>
        {/* End Header */}
        {/* Content */}
        <IonContent fullscreen>
          <ion-grid
            size="12"
            size-sm="8"
            offset-sm="2"
            class="h-full grid w-full p-0"
          >
            <IonCol class="ion-align-self-end w-full p-0">
              <div className="flex flex-col p-5">
                {messages?.map((message, idx) => {
                  return <MessageTile key={idx} message={message} />;
                })}
              </div>
              <div className="shadow-md pt-4 bg-white p-3 flex flex-row items-center gap-2">
                <IonIcon icon={addCircleOutline} size="large" />
                <IonItem color="white" className="w-full" no-lines>
                  <IonInput
                    name="Message"
                    placeholder="Enter Message"
                    class="w-full"
                    color="white"
                    onIonInput={(v) => setNewMessage(v.target.value)}
                  />
                  <IonButton
                    slot="end"
                    fill="clear"
                    onClick={handleCreateMessage}
                  >
                    <IonIcon icon={send} color="blue" />
                  </IonButton>
                </IonItem>
              </div>
            </IonCol>
          </ion-grid>
        </IonContent>
      </IonPage>
    </>
  );

  return user && userB ? body : null;
}

export default ChatDetails;
{
  /* <div className="flex flex-col justify-end p-5">
          {messages?.map((message, idx) => {
            return <MessageTile key={idx} message={message} />;
          })}
        </div> */
}
