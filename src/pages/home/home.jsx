import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

function Home() {
  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* End Header */}

      {/* Content */}
      <IonContent fullscreen>
        <IonButton expand="full" routerLink="/app/home/details">
          Details
        </IonButton>
      </IonContent>
      {/* End Content */}
    </IonPage>
  );
}

export default Home;
