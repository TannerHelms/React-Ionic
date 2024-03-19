import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/variables.css";

/* Pages */
import ChatDetails from "./pages/chat_details";
import LogIn from "./pages/login";
import Tabs from "./pages/tabs";
import UserDetails from "./pages/user_details";
import SentFriendRequests from "./pages/sent_friend_requests";
import ReceiveFriendRequests from "./pages/received_friend_requests";
import Friends from "./pages/friends";

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/login" component={LogIn} />
        <Route path="/app" component={Tabs} />
        <Route path="/chat/details" component={ChatDetails} />
        <Route path="/user/details" component={UserDetails} />
        <Route
          exact
          path="/sentFriendRequests"
          component={SentFriendRequests}
        />
        <Route
          exact
          path="/receiveFriendRequests"
          component={ReceiveFriendRequests}
        />
        <Route exact path="/friends" component={Friends} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
