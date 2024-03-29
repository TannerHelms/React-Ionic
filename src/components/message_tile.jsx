import { useEffect, useState } from "react";
import calculateTimeAgo from "../utils/calculateTimeAgo";
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
      const uid = message.user.uid || (await getDoc(message.user)).data().uid;
      setSent(uid === user.uid);
    };
    update();
  }, [message]);

  const body = (
    <>
      <div className={`flex flex-col gap-1 p-3 4 `}>
        <div className={`flex flex-col ${sent ? "ml-auto" : ""}`}>
          {timeAgo && <p className="label">{timeAgo}</p>}
        </div>
        <div
          className={`w-fit max-w-80 ${
            sent
              ? "bg-blue-700 text-white rounded-tl-lg rounded-bl-lg rounded-br-lg"
              : "bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg"
          } p-3 shadow-md ${sent ? "ml-auto" : ""}`}
        >
          <p className="">{message.text}</p>
        </div>
      </div>
    </>
  );

  return sent != null ? body : null;
}

export default MessageTile;
