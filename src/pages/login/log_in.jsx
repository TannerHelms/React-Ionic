import { zodResolver } from "@hookform/resolvers/zod";
import { IonButton, IonContent, IonInput, IonPage } from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import handleSignIn from "../../api/handleSignIn";
import Avatar from "../../components/avatar/avatar";
import useInit from "../../hooks/useInit";
import { setCredentials } from "../../redux/auth";

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
    register,
    handleSubmit,
    setError,
    trigger,
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
    const { user, token, error } = await handleSignIn(data);
    if (error) {
      setError("root", {
        message: "Invalid Credentials",
      });
    } else {
      dispatch(setCredentials({ user, token }));
      navigate.push("/app", "root", "replace");
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
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
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
                <IonInput
                  className="bg-white"
                  labelPlacement="floating"
                  fill="outline"
                  name="password"
                  type="password"
                  label="Enter Password"
                  placeholder="Enter Password"
                  value={value}
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  isDirty={(e) => console.log(e)}
                />
              )}
            />

            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <p className="w-100 right pointer">Forgot Password?</p>
            <IonButton
              className="text-black text-lg w-full"
              disabled={isSubmitting}
              type="submit"
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

export default LogIn;
