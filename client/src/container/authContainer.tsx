// onSubmit={(e) => {
//   e.preventDefault();
//   const form = e.target as HTMLFormElement;
//   const email = (
//     form.elements.namedItem("email") as HTMLInputElement
//   ).value;
//   const password = (
//     form.elements.namedItem("password") as HTMLInputElement
//   ).value;
// }
// }

import { AuthContext } from "@/context/authContext";
import { Login, Signup } from "@/views/AuthView";
import { useContext, type FormEvent } from "react";



export function LoginContainer() {
  const context = useContext(AuthContext);
  if (!context) return;

  const { login } = context;

  function loginHandler(e: FormEvent<HTMLFormElement>) {
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement)
      .innerText;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .innerText;

    login({ email, password });
  }

  return <Login loginHandler={loginHandler} />;
}


export function SignupContainer() {
  const context = useContext(AuthContext);
  if (!context) return;

  const { signup } = context;

  function singupHandler(e: FormEvent<HTMLFormElement>) {
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement)
      .innerText;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .innerText;

    signup({ email, password });
  }

  return <Signup signupHandler={singupHandler} />;
}
