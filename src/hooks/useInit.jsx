import { useIonRouter } from "@ionic/react";

function useInit() {
  const navigate = useIonRouter();
  return { navigate };
}

export default useInit;
