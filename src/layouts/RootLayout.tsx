import { Outlet, ScrollRestoration } from "react-router-dom";
import { HashScroll } from "../components/HashScroll";

export function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <HashScroll />
      <Outlet />
    </>
  );
}
