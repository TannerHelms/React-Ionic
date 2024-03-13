import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

function HomeDetails() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Home Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding"></IonContent>
    </IonPage>
  );
}

export default HomeDetails;
