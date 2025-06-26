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
import {
  Home,
  User2Icon,
} from "lucide-react";

export function Navbar() {
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
            <DropdownMenuContent className="bg-white p-3 rounded">
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
              <DropdownMenuItem>
                <Link to={"/dashboard"} className="hover:underline">
                  dashboard
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
}
