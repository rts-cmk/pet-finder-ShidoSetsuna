import { Outlet } from "react-router";
import "./admin.scss";

function Admin() {
  return (
    <main className="admin-page">
      <Outlet />
    </main>
  );
}

export default Admin;
