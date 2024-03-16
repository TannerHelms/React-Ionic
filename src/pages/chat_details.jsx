import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { addCircleOutline, send } from "ionicons/icons";
import { createRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../components/avatar";
import MessageTile from "../components/message_tile";
import useChatMesages from "../hooks/useChatMessages";
import useCreateMessage from "../hooks/useCreateMessage";
import useInit from "../hooks/useInit";
import { selectChatId, selectChatUid, selectUser } from "../redux/chat";
import { FaSpinner } from "react-icons/fa";
function ChatDetails() {
  const { user, token, navigate, dispatch } = useInit({ auth: true });
  const chatId = useSelector(selectChatId);
  const chatUid = useSelector(selectChatUid);
  const userB = useSelector(selectUser);
  const { data: messages, setData } = useChatMesages(chatId);
  const [newMessage, setNewMessage] = useState("");
  const [create, setCreate] = useState(false);
  const { resp } = useCreateMessage({
    user,
    message: newMessage,
    chatId: chatUid,
    send: create,
    setState: setNewMessage,
  });
  const [loadCounter, setLoadCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const divRef = createRef();

  const handleCreateMessage = () => {
    if (newMessage == "") return;
    const msg = {
      text: newMessage,
      user,
      timestamp: null,
    };

    setData([...messages, msg]);
    setCreate(true);
  };

  useEffect(() => {
    if (resp?.message) {
      setCreate(false);
    }
  }, [resp]);

  useEffect(() => {
    if (newMessage == "") {
      divRef.current?.scrollIntoView({ block: "end" });
    }
  }, [messages, newMessage]);

  useEffect(() => {
    if (loadCounter == messages?.length) {
      divRef.current?.scrollIntoView({ block: "end" });
      setLoading(false);
    }
  }, [loadCounter]);

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
        <IonContent>
          <div
            mode="bottom"
            className={`flex flex-col p-5 overflow-y-auto ${
              loading ? "hidden" : "block"
            }`}
            ref={divRef}
          >
            {messages?.map((message, idx) => {
              return (
                <MessageTile
                  key={idx}
                  message={message}
                  onLoad={() => setLoadCounter((curr) => curr + 1)}
                />
              );
            })}
          </div>
          <div
            className={`${
              loading ? "flex flex-col w-full items-center" : "hidden"
            }`}
          >
            <FaSpinner className="spin" size="50px" />
          </div>
        </IonContent>
        <IonFooter>
          <div className="shadow-md pt-4 bg-white p-3 flex flex-row items-center gap-2">
            <IonIcon icon={addCircleOutline} size="large" />
            <IonItem color="white" className="w-full" no-lines>
              <IonInput
                name="Message"
                placeholder="Enter Message"
                class="w-full"
                color="white"
                onIonInput={(v) => setNewMessage(v.target.value)}
                value={newMessage}
              />
              <IonButton slot="end" fill="clear" onClick={handleCreateMessage}>
                <IonIcon icon={send} color="blue" />
              </IonButton>
            </IonItem>
          </div>
        </IonFooter>
      </IonPage>
    </>
  );

  return user && userB ? body : null;
}

export default ChatDetails;
