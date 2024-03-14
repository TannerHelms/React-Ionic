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
import { Details } from "../../components/details/details";
import { getUser } from "../../redux/details";

function HomeDetails() {
  const user = useSelector(getUser);
  console.log(user);
  return (
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
  );
}

export default HomeDetails;
