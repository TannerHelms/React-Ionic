import { IonButton, IonContent, IonInput, IonPage } from "@ionic/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import Avatar from "../../components/avatar/avatar";
import getUser from "../../hooks/getUser";
import useInit from "../../hooks/useInit";
import { setCredentials } from "../../redux/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { schema } from "./log_in";

export function LogIn() {
  const { navigate } = useInit(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    try {
      signInWithEmailAndPassword(getAuth(), data.email, data.password).then(
        async (userCredential) => {
          const { uid } = userCredential.user;
          const token = userCredential._tokenResponse.refreshToken;
          const user = await getUser(uid);
          delete user.created_time;
          if (user) {
            dispatch(setCredentials({ user, token }));
            navigate.push("/app", "root", "replace");
          } else {
            setError("Invalid Credentials");
          }
        }
      );
    } catch (error) {
      setError("Invalid Credentials");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Content Container */}
        {/* Email Input */}
        <div className="flex flex-col space-y-6 justify-center items-center h-screen p-8 w-full">
          <Avatar
            src="https://firebasestorage.googleapis.com/v0/b/saint-seeing-5d426.appspot.com/o/saint_seeing_logo.png?alt=media&token=655134ad-bc31-4232-b02b-dfb82019584d"
            alt="logo"
            size="120px"
          />
          <h1>Log In</h1>
          {errors.root && <p className="text-red-500">{errors.root}</p>}
          <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <IonInput
              className="bg-white"
              labelPlacement="floating"
              fill="outline"
              name="email"
              type="email"
              label="Enter Email"
              placeholder="Enter Email"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
            <IonInput
              className="bg-white"
              labelPlacement="floating"
              fill="outline"
              name="password"
              type="password"
              label="Enter Password"
              placeholder="Enter Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
            <p className="w-100 right pointer">Forgot Password?</p>
            <IonButton
              className="text-black text-lg"
              type="submit"
              expand="full"
              disabled={isSubmitting}
            >
              Submit
            </IonButton>
            <div className="flex flex-row gap-2 justify-center">
              <p>Don't have account?</p>
              <p className="pointer">Sign Up</p>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}
