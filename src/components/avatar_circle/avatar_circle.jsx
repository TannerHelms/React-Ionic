import classes from "./avatar_circle.module.css";

function AvatarCircle({ url, size = "120px" }) {
  return (
    <span className={classes.profilePhoto}>
      <img src={url} width={size} height={size} />
    </span>
  );
}

export default AvatarCircle;
