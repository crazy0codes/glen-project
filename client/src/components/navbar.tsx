import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { Home, User2Icon } from "lucide-react";

export function Navbar() {
  return (
    <nav className="flex justify-around items-center bg-orange-500 px-10 py-5">
      <h1 className=" w-full text-2xl font-medium ">Property Finder</h1>
      <ul className="flex justify-around items-center">
        <li>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              type="text"
              className="bg-gray-100 rounded-full"
              placeholder="Search"
            />
          </form>
        </li>
        <Link to={"/"} className="rounded-full bg-white p-2">
          <Home />
        </Link>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p-5 rounded-full">
                <User2Icon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to={"/login"}>login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={"/signup"}>signup</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
}
