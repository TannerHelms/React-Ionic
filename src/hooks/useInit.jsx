import { useIonRouter } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../redux/auth";

function useInit({ auth = true }) {
  const navigate = useIonRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  let token = useSelector(selectCurrentToken);
  if (!token) {
    token = localStorage.getItem("token");
  }
  if (!user && auth) {
    return { token, navigate };
  }
  return { user, token, navigate, dispatch };
}

export default useInit;
