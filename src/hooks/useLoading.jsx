import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

function useLoading(ct = 0, { size = "32px", onLoad }) {
  const [loadCounter, setLoadingCounter] = useState(0);
  const loadClass = loadCounter != null ? "hidden" : "";
  const spinClass =
    loadCounter != null ? "flex justify-center w-full spin" : "hidden";
  const Spinner = <FaSpinner className={spinClass} size={size} />;

  const load = () => {
    if (loadCounter == null) return;

    if (loadCounter + 1 === ct) {
      setLoadingCounter(null);
      if (onLoad) {
        onLoad();
      }
    } else {
      setLoadingCounter(loadCounter + 1);
    }
  };
  return { loadClass, load, Spinner };
}

export default useLoading;

/*

.spin {
    animation: icon-spin 1s linear infinite;
}

@keyframes icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


*/
