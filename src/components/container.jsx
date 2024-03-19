import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Spinner from "./spinner";
const Container = ({ title, loading = flase, children }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
