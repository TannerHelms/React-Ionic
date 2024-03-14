import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useInit from "../../hooks/useInit";
import Avatar from "../../components/avatar/avatar";
import Button from "../../components/button/button";
import { UserPhotos } from "../../components/user_photos/user_photos";
import classes from "./edit_photos.module.css";
import { Crop } from "@ionic-native/crop/ngx";
import { File } from "@ionic-native/file/ngx";
import { Camera } from "@ionic-native/Camera/ngx";
function EditPhotos() {
  const { user } = useInit(true);
  const camera = Camera();

  const pickImage = (sourceType) => {
    const options = {
      quality: 100,
      sourceType,
      destinationType: camera.destinationType.FILE_URI,
      encodingType: camera.EncodingType.JPEG,
      mediaType: camera.MediaType.PICTURE,
    };

    camera.getPicture(options).then((imageData) => {
      console.log("worked");
    });
  };

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
