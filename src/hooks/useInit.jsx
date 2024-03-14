import { useIonRouter } from "@ionic/react";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../redux/auth";

function useInit({ auth = true }) {
  const navigate = useIonRouter();
  const user = useSelector(selectCurrentUser);
  let token = useSelector(selectCurrentToken);
  if (!token) {
    token = localStorage.getItem("token");
    
  }
  if (!user && auth) {
    return { token, navigate };
  }
  return { user, token, navigate };
}

export default useInit;
