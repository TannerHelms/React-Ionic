import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Button from "../components/button";
import { UserPhotos } from "../components/user_photos";
import useInit from "../hooks/useInit";
function EditPhotos() {
  const { user, navigate } = useInit(true);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Edit Photos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="w-100 flex col centery">
          <div className={`flex col w-100 g-20 centery p-20 max-w-lg`}>
            <UserPhotos user={user} />
            <Button text="Update Cover Picture" />
            <Button text="Update Profile Picture" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default EditPhotos;
