import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { LogOut, User2Icon } from "lucide-react";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export function Navbar() {
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  const { logout, isAuth } = context;

  return (
    // bg-linear-to-r/longer from-indigo-200
    <nav className="  flex justify-around items-center border border-b-gray-400 px-10 py-5">
      <h1 className=" w-full text-4xl tracking-tighter font-medium ">
        <Link to={"/"}>Property Finder</Link>
      </h1>
      <ul className="flex justify-around items-center">
        <li className="mr-3">
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              type="text"
              className="bg-gray-100 w-45 rounded-full border border-gray-400"
              placeholder="Search"
            />
          </form>
        </li>
        {/* <Link to={"/"} className="rounded-full bg-white p-2">
          <Home />
        </Link> */}
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Button className="bg-transparent hover:bg-gray-300 border border-gray-300 h-[44px] w-[44px] rounded-full">
                <User2Icon className="text-black size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white p-3 rounded-md">
              <DropdownMenuItem>
                <Link to={"/dashboard"} className="hover:underline text-white">
                  <span className="ml-2">Dashboard</span>
                </Link>
              </DropdownMenuItem>
              {!isAuth ? (
                <>
                  <DropdownMenuItem className="hover:outline-none">
                    <Link
                      to={"/login"}
                      className="flex items-center hover:border-none hover:underline"
                    >
                      <p>login</p>
                      <Separator />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:outline-none">
                    <Link
                      to={"/signup"}
                      className="hover:outline-none hover:underline"
                    >
                      <p>register</p>
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem className="hover:outline-none">
                  <Button
                    onClick={logout}
                    className="cursor-pointer bg-transparent hover:bg-transparent hover:text-red-500 hover:underline w-full text-left"
                  >
                    <LogOut />
                    <span className="ml-2">logout</span>
                  </Button>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
}
