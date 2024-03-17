import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import useInit from "../hooks/useInit";
import { setChat } from "../redux/chat";
import calculateTimeAgo from "../utils/calculateTimeAgo";
import LoadProfileImage from "./load_profile_image";

function ChatTile({ user, chat }) {
  const { dispatch, navigate } = useInit(true);
  const [toUser, setToUser] = useState(null);
  const [timeAgo, setTimeAgo] = useState(null);

  useEffect(() => {
    const setData = async () => {
      chat.users.forEach(async (u) => {
        const docRef = await getDoc(u);
        const data = docRef.data();
        if (data.uid !== user?.uid) {
          setToUser(data);
          setTimeAgo(calculateTimeAgo(chat.last_message_time));
        }
      });
    };
    setData();
  }, [chat]);

  const body = (
    <div
      className="flex flex-row items-center justify-between w-full cursor-pointer border-b-2 fade-in"
      onClick={() => {
        const newUser = toUser;
        delete newUser.created_time;
        dispatch(
          setChat({
            chatId: chat.id,
            user: toUser,
            chatUid: chat.id,
          })
        );
        navigate.push("/chat/details");
      }}
    >
      <div className="flex flex-row gap-4 items-center">
        <LoadProfileImage
          src={toUser?.photo_url}
          hashsrc={toUser?.profile_hash}
          size={64}
        />
        <div className="flex flex-col">
          <h2 className="text-xl">{toUser?.display_name}</h2>
          <p className="label">{chat.last_message}</p>
          {timeAgo && <p className="label">{timeAgo}</p>}
        </div>
      </div>
      <div>
        <FaArrowRight />
      </div>
    </div>
  );

  return toUser ? body : null;
}

export default ChatTile;
