import { useEffect, useState } from "react";
import Container from "../components/container";
import FriendRequest from "../components/friend_request";
import useInit from "../hooks/useInit";
import FirestoreApi from "../api/firestoreApi";
import calculateTimeAgo from "../utils/calculateTimeAgo";

function ReceiveFriendRequests() {
  const { user } = useInit(true);
  const [requests, setRequests] = useState();

  useEffect(() => {
    const get = async () => {
      const resp = await FirestoreApi.getReceivedFriendRequests(user.uid);
      const updatedReq = await Promise.all(
        resp.map(async (request) => {
          const time = calculateTimeAgo(request.timestamp);
          const user = await FirestoreApi.getUser(request.to);
          return {
            ...request,
            timestamp: time,
            user,
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
    <Container title="Received Friend Requests" back={true} loading={!requests}>
      <div className="flex flex-col w-full items-center gap-5 p-5">
        {requests?.length != 0 && (
          <p className="label">
            You currently have {requests?.length} friend requests
          </p>
        )}
        {requests?.map((request, idx) => {
          return <FriendRequest key={idx} request={request} sent={false} />;
        })}
        {requests?.length == 0 && (
          <p className="label">You current have no friend requests</p>
        )}
      </div>
    </Container>
  );
}

export default ReceiveFriendRequests;
