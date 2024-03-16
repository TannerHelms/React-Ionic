import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import ChatTile from "../components/chat_tile";
import useCollection from "../hooks/useCollection";
import useInit from "../hooks/useInit";

function Messages() {
  const { user, navigate, dispatch } = useInit(true);
  const { data: chats } = useCollection("chats");
  const [loadingCounter, setLoadingCounter] = useState(0);

  useEffect(() => {
    if (loadingCounter == chats?.length) {
      setLoadingCounter(null);
    }
  }, [loadingCounter]);

  const handleLoad = () => {
    setLoadingCounter((old) => old + 1);
  };

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
          <div
            className={`flex flex-col gap-3 p-5 items-center ${
              loadingCounter ? "hidden" : "flex"
            }`}
          >
            <div className="w-full max-w-xl flex flex-col gap-4">
              <p>Below are your chats</p>
              {chats?.map((chat, idx) => {
                return (
                  <ChatTile
                    key={idx}
                    user={user}
                    chat={chat}
                    onLoad={handleLoad}
                    className="load:"
                  />
                );
              })}
            </div>
          </div>
          {loadingCounter != null && (
            <FaSpinner className="spin flex w-full items-center" size="50px" />
          )}
        </IonContent>
        {/* End Content */}
      </IonPage>
    </>
  );

  return user ? body : null;
}
export default Messages;
