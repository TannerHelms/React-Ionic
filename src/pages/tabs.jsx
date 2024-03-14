import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { airplane, home, person } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import HomeDetails from "./home/home_details";
import Messages from "./messages/messages";
import Home from "./home/home";

function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Set the Paths for Child Elements */}
        <Route exact path="/app">
          <Redirect to="/app/home" />
        </Route>
        <Route exact path="/app/home" component={Home} />
        <Route exact path="/app/home/details" component={HomeDetails} />
        <Route exact path="/app/messages" component={Messages} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        {/* Home Icon */}
        <IonTabButton tab="home" href="/app/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        {/* Messages Icon */}
        <IonTabButton tab="messages" href="/app/messages">
          <IonIcon icon={airplane} />
          <IonLabel>Messages</IonLabel>
        </IonTabButton>
        {/* Profile Icon */}
        <IonTabButton tab="profile" href="../">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default Tabs;
