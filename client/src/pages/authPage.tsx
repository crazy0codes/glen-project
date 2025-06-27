import { LoginContainer, SignupContainer } from "@/container/authContainer";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export function LoginPage() {
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }
  const { isAuth } = context;
  if (isAuth) {
    return <Navigate to="/" replace />;
  }
  return <LoginContainer />;
}

export function SignupPage() {
  return <SignupContainer />;
}
