import { zodResolver } from "@hookform/resolvers/zod";
import { IonContent, IonPage } from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import FirestoreApi from "../api/firestoreApi";
import Avatar from "../components/avatar";
import Button from "../components/button";
import Input from "../components/input";
import useInit from "../hooks/useInit";

const schema = z.object({
  email: z
    .string()
    .min(1, "Plesae enter a email")
    .email("Please enter a valid email"),
  password: z.string().min(1, "Please enter a password"),
});

function LogIn() {
  const { navigate, dispatch } = useInit({ auth: false });
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await FirestoreApi.signIn(dispatch, data.email, data.password);
      navigate.push("/app", "root", "replace");
    } catch (error) {
      setError("root", {
        message: "Invalid Credentials",
      });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Email Input */}
        <div className="flex flex-col space-y-6 justify-center items-center h-screen p-8 w-full">
          <Avatar
            src="https://firebasestorage.googleapis.com/v0/b/saint-seeing-5d426.appspot.com/o/saint_seeing_logo.png?alt=media&token=655134ad-bc31-4232-b02b-dfb82019584d"
            alt="logo"
            size="120px"
          />
          <h1>Log In</h1>
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
          <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <Input
                  name="email"
                  type="email"
                  label="Enter Email"
                  value={value}
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                />
              )}
            />

            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <Controller
              name="password"
              control={control}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <Input
                  name="password"
                  type="password"
                  label="Enter Password"
                  value={value}
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                />
              )}
            />

            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <p className="w-100 right pointer">Forgot Password?</p>
            <Button disabled={isSubmitting} type="submit" text="Submit" />
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

export default LogIn;
