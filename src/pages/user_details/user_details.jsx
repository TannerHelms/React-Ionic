import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { Details } from "../../components/details";
import { getUser } from "../../redux/details";

function HomeDetails() {
  const user = useSelector(getUser);

  const body = (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/app/home"></IonBackButton>
            </IonButtons>
            <IonTitle>User Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="secondary">
          <Details user={user} />
        </IonContent>
      </IonPage>
    </>
  );

  return user ? body : null;
}

export default HomeDetails;
