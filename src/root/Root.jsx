import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const Root = () => {
  return (
    <div className="font-Poppins ">
      <Navbar />
      <Outlet></Outlet>

      <Toaster />
    </div>
  );
};

export default Root;
