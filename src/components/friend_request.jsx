import { useState } from "react";
import FirestoreApi from "../api/firestoreApi";
import LoadProfileImage from "./load_profile_image";
import useToast from "./use_toast";

function FriendRequest({ request, sent = false, friend = false }) {
  const [deleted, setDeleted] = useState(false);
  const toast = useToast();
  const handleCancel = async () => {
    setDeleted(true);
    toast("Friend request cancelled", "top");
    await FirestoreApi.cancelFriendRequest(request.id);
  };

  const handleAccept = async () => {
    setDeleted(true);
    toast("Accepted Friend Request", "top");
    await FirestoreApi.createFriendship(request.to, request.from, request.id);
  };

  const handleRemoveFriend = async () => {
    setDeleted(true);
    toast("Removed Friend", "top");
    await FirestoreApi.deleteFriendship(request.id);
  };

  const body = (
    <div className="flex flex-row items-center between gap-5 bg-white rounded-md p-5 w-content">
      <div className="flex flex-row gap-3 items-center">
        <LoadProfileImage
          src={request.user.photo_url}
          hashsrc={request.user.profile_hash}
          size={75}
        />
        <div>
          <h2 className="text-xl">{request.user.display_name}</h2>
          <p className="label">
            {" "}
            {friend
              ? request.timestamp.substring(
                  0,
                  request.timestamp.lastIndexOf(" ")
                )
              : request.timestamp}
          </p>
        </div>
      </div>
      <p
        className="pointer"
        onClick={
          sent ? handleCancel : friend ? handleRemoveFriend : handleAccept
        }
      >
        {sent ? "Cancel" : friend ? "Unfriend" : "Accept"}
      </p>
    </div>
  );

  return deleted ? null : body;
}

export default FriendRequest;
