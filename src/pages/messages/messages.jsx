import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

function Messages() {
  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Messages</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* End Header */}
      {/* Content */}
      <IonContent fullscreen></IonContent>
      {/* End Content */}
    </IonPage>
  );
}
export default Messages;
