import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FaCamera, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Details } from "../components/details";
import SettingTile from "../components/setting_tile";
import useInit from "../hooks/useInit";

function Profile() {
  const { user, navigate } = useInit(true);

  const body = (
    <>
      {/* This is the Menu Settings */}
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Profile Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonMenuToggle>
            <div className="flex col g-20">
              {/* <IonButton>Click to close the menu</IonButton> */}
              <SettingTile
                icon={<FaUser size="32px" />}
                text="Edit Profile"
                onClick={() => {
                  navigate.push("/app/editProfile");
                }}
              />
              <SettingTile
                icon={<FaCamera size="32px" />}
                text="Edit Photos"
                onClick={() => navigate.push("/app/editPhotos")}
              />
              <SettingTile
                icon={<FaSignOutAlt size="32px" />}
                text="Log out of account"
                onClick={() => navigate.push("/", "root", "replace")}
              />
            </div>
          </IonMenuToggle>
        </IonContent>
      </IonMenu>
      {/* This is the Headers content */}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* This is the Page Content */}
        <IonContent color="secondary">
          <div className="flex flex-col w-full items-center">
            <Details user={user} />
          </div>
        </IonContent>
      </IonPage>
    </>
  );

  return user ? body : null;
}

export default Profile;
