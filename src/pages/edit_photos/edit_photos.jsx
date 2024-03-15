import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Button from "../../components/button/button";
import { UserPhotos } from "../../components/user_photos/user_photos";
import useInit from "../../hooks/useInit";
import classes from "./edit_photos.module.css";
function EditPhotos() {
  const { user, navigate } = useInit(true);
  if (!user) {
    navigate.push("/", "root", "replace");
  }
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
          <div className={`flex col w-100 g-20 centery p-20 ${classes.photos}`}>
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
