import { Outlet, useLocation } from "react-router";
import Nav from "../components/nav/nav.jsx";

export default function Layout() {
  const location = useLocation();
  const hideNavOnPaths = ["/animal"];
  const shouldHideNav = hideNavOnPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Outlet />

      {!shouldHideNav && <Nav />}
    </>
  );
}
