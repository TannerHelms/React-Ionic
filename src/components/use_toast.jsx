import { useIonToast } from "@ionic/react";

const useToast = () => {
  const [present] = useIonToast();

  const toast = (message, position = "top") => {
    present({
      color: "primary",
      message: message,
      duration: 3000,
      position: position,
    });
  };

  return toast;
};

export default useToast;
