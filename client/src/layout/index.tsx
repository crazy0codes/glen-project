import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
    <Navbar/>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
