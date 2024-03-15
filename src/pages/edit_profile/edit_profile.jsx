import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import getUser from "../../hooks/getUser";
import updateUserDoc from "../../hooks/updateUserDoc";
import useAutocomplete from "../../hooks/useAutocomplete";
import useInit from "../../hooks/useInit";
import { setCredentials } from "../../redux/auth";
import classes from "./edit_profile.module.css";

function EditProfile() {
  const { user, token, dispatch } = useInit(true);
  const [present] = useIonToast();
  const [search, setSearch] = useState(false);
  const [newUser, setNewUser] = useState({
    display_name: user?.display_name,
    email: user?.email,
    age: user?.age,
    phone_number: user?.phone_number,
    address: user?.addresss,
    longitude: user?.longitude,
    latitude: user?.latitude,
  });

  const { addresses } = useAutocomplete({
    user,
    query: newUser.address,
    search: search,
  });

  const handleChange = (e) => {
    if (e.target.name == "address") {
      setSearch(true);
    }
    setNewUser((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    const resp = await updateUserDoc(user.uid, newUser);
    if (!resp) {
      const updatedUser = await getUser(user.uid);
      delete updatedUser.created_time;
      dispatch(setCredentials({ user: updatedUser, token: token }));
      presentToast("top");
    }
  };

  const presentToast = (position) => {
    present({
      color: "primary",
      message: "Updated Account Sucessfully",
      duration: 3000,
      position: position,
    });
  };

  const body = (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/app/home"></IonBackButton>
            </IonButtons>
            <IonTitle>Edit Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="flex col between h-100">
            <div className="flex col g-20">
              {newUser && (
                <>
                  <Input
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleChange}
                    type="email"
                  />
                  <Input
                    name="display_name"
                    placeholder="Display Name"
                    value={newUser.display_name}
                    onChange={handleChange}
                  />
                  <Input
                    name="age"
                    placeholder="Age"
                    value={newUser.age}
                    onChange={handleChange}
                    type="number"
                  />
                  <Input
                    name="phone_number"
                    placeholder="Phone Number"
                    value={newUser.phone_number}
                    onChange={handleChange}
                  />
                  <div className="flex col g-10">
                    <Input
                      name="address"
                      placeholder="Address"
                      value={newUser.address}
                      onChange={handleChange}
                    />
                    {addresses && (
                      <div className={classes.addressContainer}>
                        {addresses.map((address, idx) => {
                          return (
                            <div
                              key={idx}
                              className={`${classes.address} hover-primary br p-10`}
                              onClick={() => {
                                setSearch(false);
                                setNewUser((old) => ({
                                  ...old,
                                  address: address.formattedAddress,
                                  longitude: address.longitude,
                                  latitude: address.latitude,
                                }));
                              }}
                            >
                              <p>{address.formattedAddress}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <Button text="Save" onClick={handleUpdate} />
          </div>
        </IonContent>
      </IonPage>
    </>
  );

  return user ? body : null;
}

export default EditProfile;
