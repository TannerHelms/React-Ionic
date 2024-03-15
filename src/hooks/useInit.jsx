import { useIonRouter } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../redux/auth";
import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
function useInit({ auth = true }) {
  const navigate = useIonRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const history = useHistory();
  useEffect(() => {
    if (auth && !user) {
      history.push("/");
    }
  }, [auth, user, history]);

  let token = useSelector(selectCurrentToken);

  return { user, token, navigate, dispatch };
}

export default useInit;
