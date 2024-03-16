import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import calculateTimeAgo from "../api/calculateTimeAgo";
import useInit from "../hooks/useInit";
import { setChat } from "../redux/chat";
import Avatar from "./avatar";

function ChatTile({ user, chat }) {
  const { dispatch, navigate } = useInit(true);
  const [toUser, setToUser] = useState(null);
  const [timeAgo, setTimeAgo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      chat.users.forEach(async (u) => {
        const docRef = await getDoc(u);
        const data = docRef.data();
        if (data.uid != user?.uid) {
          setToUser(data);
          const timeAgo = calculateTimeAgo(chat.last_message_time);
          setTimeAgo(timeAgo);
        }
      });
    };
    setData();
  }, [chat]);

  return (
    toUser && (
      <div
        className="flex flex-row items-center justify-between w-full cursor-pointer border-b-2"
        style={{ display: loading ? "none" : "flex" }}
        onClick={() => {
          const newUser = toUser;
          delete newUser.created_time;
          dispatch(
            setChat({
              chatId: chat.chat_group_id,
              user: toUser,
              chatUid: chat.id,
            })
          );
          navigate.push("/chat/details");
        }}
      >
        <div className="flex flex-row gap-4 items-center">
          <Avatar
            src={toUser.photo_url}
            alt="Profile"
            size="64px"
            onLoad={() => {
              setLoading(false);
            }}
          />
          <div className="flex flex-col">
            <h2 className="text-xl">{toUser.display_name}</h2>
            <p className="label">{chat.last_message}</p>
            {timeAgo && <p className="label">{timeAgo}</p>}
          </div>
        </div>
        <div>
          <FaArrowRight />
        </div>
      </div>
    )
  );
}

export default ChatTile;
