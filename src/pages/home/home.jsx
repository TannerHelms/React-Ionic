import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";
import useInit from "../../hooks/useInit";
import useUsers from "../../hooks/useUsers";

function Home() {
  const { user, token, navigate } = useInit(true);
  const { users } = useUsers();

  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    //console.log(user);
    //console.log(token);
    if (!user) {
      navigate.push("/", "root", "replace");
    }
  }, [user]);

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
