import { useEffect, useState } from "react";
import calculateTimeAgo from "../hooks/calculateTimeAgo";
import { getDoc } from "firebase/firestore";
import useInit from "../hooks/useInit";

function MessageTile({ message }) {
  const { user } = useInit(true);
  const [timeAgo, setTimeAgo] = useState(null);
  const [sent, setSent] = useState(null);

  useEffect(() => {
    const update = async () => {
      const timeAgo = calculateTimeAgo(message.timestamp);
      setTimeAgo(timeAgo);
      const sender = await getDoc(message.user);

      const uid = sender.data().uid;
      if (uid === user.uid) {
        setSent(true);
      } else {
        setSent(false);
      }
    };

    update();
  }, [message]);

  const body = (
    <>
      <div className={`flex flex-col gap-2 p-5 4 `}>
        <div className={`flex flex-col ${sent ? "ml-auto" : ""}`}>
          {timeAgo && <p className="label">{timeAgo}</p>}
        </div>
        <div
          className={`w-80 ${
            sent ? "bg-blue-700 text-white" : "bg-white"
          } p-3 rounded-md shadow-md ${sent ? "ml-auto" : ""}`}
        >
          <p className="">{message.text}</p>
        </div>
      </div>
    </>
  );

  return sent != null ? body : null;
}

export default MessageTile;
