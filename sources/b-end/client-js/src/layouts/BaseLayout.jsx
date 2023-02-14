import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const BaseLayout = () => (
  <section className="p-4">
    <NavBar />
    <Outlet />
  </section>
);

export default BaseLayout;
