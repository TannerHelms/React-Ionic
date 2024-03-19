import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Spinner from "./spinner";
const Container = ({ title, loading = false, children, back = false }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {back && (
            <IonButtons slot="start">
              <IonBackButton defaultHref="/app/home"></IonBackButton>
            </IonButtons>
          )}
          <IonTitle class="ion-text-center">{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading === false && children}
        <Spinner state={loading} />
      </IonContent>
    </IonPage>
  );
};

export default Container;
