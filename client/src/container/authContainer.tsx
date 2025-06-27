import { AuthContext } from "@/context/authContext";
import { Login, Signup } from "@/views/AuthView";
import { useContext, type FormEvent } from "react";

export function LoginContainer() {
  const context = useContext(AuthContext);
  if (!context) {
    // It's generally better to return null or throw an error if the context is strictly required
    // rather than just returning undefined, which can lead to unexpected UI.
    return null;
  }

  const { login } = context;

  function loginHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // This line correctly prevents the default form submission (page reload)
    const form = e.target as HTMLFormElement;

    // Correctly access the input values using .value
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;

    const email = emailInput ? emailInput.value : ''; // Safely get the value
    const password = passwordInput ? passwordInput.value : ''; // Safely get the value

    if (email && password) {
      login({ email, password });
    } else {
      console.warn("Login: Email or password field is empty.");
      // You might want to provide user feedback here, like a temporary error message.
    }
  }

  return <Login loginHandler={loginHandler} />;
}

export function SignupContainer() {
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  const { signup } = context;

  // Renamed from singupHandler to signupHandler for consistency and correctness
  function signupHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // This line correctly prevents the default form submission (page reload)
    const form = e.target as HTMLFormElement;

    // IMPORTANT: Ensure your <Input> components in Signup (AuthView.tsx) have 'name="email"' and 'name="password"' attributes.
    // If they don't, form.elements.namedItem will return null.
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;

    const email = emailInput ? emailInput.value : ''; // Safely get the value
    const password = passwordInput ? passwordInput.value : ''; // Safely get the value

    if (email && password) {
      signup({ email, password });
    } else {
      console.warn("Signup: Email or password field is empty.");
      // You might want to provide user feedback here.
    }
  }

  return <Signup signupHandler={signupHandler} />;
}