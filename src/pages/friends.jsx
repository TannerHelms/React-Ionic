import { useEffect, useState } from "react";
import Container from "../components/container";
import FriendRequest from "../components/friend_request";
import useInit from "../hooks/useInit";
import FirestoreApi from "../api/firestoreApi";
import calculateTimeAgo from "../utils/calculateTimeAgo";

function Friends() {
  const { user } = useInit(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const get = async () => {
      const resp = await FirestoreApi.getFriends(user.uid);
      const updatedReq = await Promise.all(
        resp.map(async (friend) => {
          console.log(user);
          const time = calculateTimeAgo(friend.timestamp);
          const f =
            friend.userIds[0] == user.uid
              ? friend.userIds[1]
              : friend.userIds[0];
          const fr = await FirestoreApi.getUser(f);
          return {
            ...friend,
            timestamp: time,
            user: fr,
          };
        })
      );
      setRequests(updatedReq);
    };
    if (user) {
      get();
    } else {
      setRequests(null);
    }
  }, [user]);

  return (
    <Container title="Friends" back={true} loading={!requests}>
      <div className="flex flex-col w-full items-center gap-5 p-5">
        {requests?.length != 0 && (
          <p className="label">You currently have {requests?.length} friends</p>
        )}
        {requests?.map((request, idx) => {
          return (
            <FriendRequest
              key={idx}
              request={request}
              sent={false}
              friend={true}
            />
          );
        })}
        {requests?.length == 0 && (
          <p className="label">You currently have no friends</p>
        )}
      </div>
    </Container>
  );
}

export default Friends;
