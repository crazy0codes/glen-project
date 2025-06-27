import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { FormEvent } from "react";

interface Submit {
  loginHandler?: (e: FormEvent<HTMLFormElement>) => void;
  signupHandler?: (e: FormEvent<HTMLFormElement>) => void;
}

export function Login({ loginHandler }: Submit) {
  return (
    <div className="grid  place-items-center  h-screen bg-gray-50  lg:grid-cols-2 grid-cols-1">
      <div className=" lg:flex hidden bg-orange-400 flex justify-center items-center w-full h-full ">
        <h1 className="px-2 text-2xl tracking-tighter text-balance max-lg:font-medium max-sm:px-4 sm:text-5xl lg:text-6xl xl:text-8xl">
          Welcome Back!
        </h1>
      </div>
      <Card className=" w-[300px]   p-3">
        <CardTitle className="self-center text-center mt-4">
          <h2 className="text-xl ">Login</h2>
        </CardTitle>
        <CardContent className="px-3 flex flex-col justify-evenly py-3 h-60">
          <form onSubmit={loginHandler} className="flex flex-col gap-3">
            <Input
              name="email"
              type="text"
              placeholder="example@email.com"
              className=""
            />
            <Input name="password" type="text" placeholder="password" />
            <Button
              type="submit"
              className="w-full hover:bg-orange-500 bg-orange-400 cursor-pointer"
            >
              login
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter>
          <small className="text-blue-500 underline cursor-pointer">
            signup
          </small>
        </CardFooter> */}
      </Card>
    </div>
  );
}

export function Signup({ signupHandler }: Submit) {
  return (
    <div className="grid  place-items-center  h-screen bg-gray-50  lg:grid-cols-2 grid-cols-1">
      <div className=" lg:flex hidden bg-orange-400 flex justify-center items-center w-full h-full ">
        <h1 className="px-2 text-2xl tracking-tighter text-balance max-lg:font-medium max-sm:px-4 sm:text-5xl lg:text-6xl xl:text-8xl">
          Welcome
        </h1>
      </div>
      <Card className=" w-[300px]   p-3">
        <CardTitle className="self-center text-center mt-4">
          <h2 className="text-xl ">Signup</h2>
        </CardTitle>
        <CardContent>
          <form
            onSubmit={signupHandler}
            className="px-3 flex flex-col justify-evenly py-3 h-60"
          >
            <Input name="email" placeholder="example@email.com" className="" />
            <Input name="password" placeholder="password" />
            <Button type="submit"  className="w-full hover:bg-orange-500 bg-orange-400 cursor-pointer">
              signin
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter>
          <small className="text-blue-500 underline cursor-pointer">
            login
          </small>
        </CardFooter> */}
      </Card>
    </div>
  );
}