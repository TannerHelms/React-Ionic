import { useEffect, useState } from "react";
import calculateTimeAgo from "../api/calculateTimeAgo";
import { getDoc } from "firebase/firestore";
import useInit from "../hooks/useInit";

function MessageTile({ message, onLoad }) {
  const { user } = useInit(true);
  const [timeAgo, setTimeAgo] = useState(null);
  const [sent, setSent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const update = async () => {
      const timeAgo = calculateTimeAgo(message.timestamp);
      setTimeAgo(timeAgo);

      if (!message.timestamp) {
        console.log(message);
      }

      let uid = null;

      if (message.user.uid) {
        uid = message.user.uid;
      } else {
        const sender = await getDoc(message.user);
        uid = sender.data().uid;
      }

      if (uid === user.uid) {
        setSent(true);
      } else {
        setSent(false);
      }
      setLoading(false);
    };

    update();
  }, [message]);

  useEffect(() => {
    if (loading) {
      onLoad();
    }
  }, [loading]);
  const body = (
    <>
      <div className={`flex flex-col gap-2 p-5 4 `}>
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
