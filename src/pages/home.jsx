import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import UserTile from "../components/user_tile";
import useDistanceBetween from "../hooks/useDistanceBetween";
import useInit from "../hooks/useInit";
import Spinner from "../components/spinner";
import Container from "../components/container";
function Home() {
  const { user, dispatch } = useInit(true);
  const { userDistances } = useDistanceBetween(user);

  const body = (
    <Container title="Home" loading={!userDistances}>
      <div className="flex flex-col w-full items-center">
        {userDistances?.map((data, idx) => {
          const { user, distance } = data;
          return (
            <UserTile
              key={idx}
              user={user}
              distance={distance}
              dispatch={dispatch}
            />
          );
        })}
      </div>
    </Container>
  );
  return user ? body : null;
}

export default Home;
