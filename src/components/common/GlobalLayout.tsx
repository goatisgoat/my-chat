import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default GlobalLayout;
