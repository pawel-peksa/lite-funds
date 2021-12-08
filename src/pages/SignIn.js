import { useState } from "react";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { SignInForm } from "../components/SignInForm";

export const SignIn = () => {
  const [forgotPassword, setForgotPassword] = useState(false);

  return forgotPassword ? (
    <ResetPasswordForm setForgotPassword={setForgotPassword} />
  ) : (
    <SignInForm setForgotPassword={setForgotPassword} />
  );
};
