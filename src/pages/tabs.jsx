import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { chatbox, home, person } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import ChatDetails from "./chat_details";
import Chats from "./chats";
import EditPhotos from "./edit_photos";
import EditProfile from "./edit_profile";
import Home from "./home";
import Profile from "./profile";

function Tabs() {
  return (
    <IonTabs className="contents">
      <IonRouterOutlet>
        {/* Set the Paths for Child Elements */}
        <Route exact path="/app">
          <Redirect to="/app/home" />
        </Route>
        <Route exact path="/app/home" component={Home} />
        <Route exact path="/app/chats" component={Chats} />
        <Route exact path="/app/profile" component={Profile} />
        <Route exact path="/app/editProfile" component={EditProfile} />
        <Route exact path="/app/editPhotos" component={EditPhotos} />
        <Route exact path="/app/messages/details" component={ChatDetails} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        {/* Home Icon */}
        <IonTabButton tab="home" href="/app/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        {/* Messages Icon */}
        <IonTabButton tab="messages" href="/app/chats">
          <IonIcon icon={chatbox} />
          <IonLabel>Messages</IonLabel>
        </IonTabButton>
        {/* Profile Icon */}
        <IonTabButton tab="profile" href="/app/profile">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default Tabs;
