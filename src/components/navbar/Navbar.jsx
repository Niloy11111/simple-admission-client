import { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authProvider/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(user);

  const navlinksBeforeLogin = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "  navBarActiveLi "
              : "navBarInActivLi"
          }
        >
          HOME
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allColleges"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "  navBarActiveLi "
              : "navBarInActivLi"
          }
        >
          COLLEGES
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/admission"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "  navBarActiveLi"
              : "navBarInActivLi"
          }
        >
          ADMISSION
        </NavLink>
      </li>
    </>
  );

  const navLinks = (
    <>
      <li className="">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "   navBarActiveLi "
              : "navBarInActivLi"
          }
        >
          HOME
        </NavLink>
      </li>

      <li className="">
        <NavLink
          to="/allColleges"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "    navBarActiveLi"
              : "navBarInActivLi"
          }
        >
          COLLEGES
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/admission"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "    navBarActiveLi"
              : "navBarInActivLi"
          }
        >
          ADMISSION
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/myCollege"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "    navBarActiveLi"
              : "navBarInActivLi"
          }
        >
          MY COLLEGE
        </NavLink>
      </li>

      {/* <li>
        <div className="dropdown hidden lg:block dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-[60px] rounded">
              <img src={user?.photoURL} alt={user?.displayName} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button className="btn btn-sm  btn-ghost">
                {user?.displayName}
              </button>
            </li>
            <li>
              <button className="btn btn-sm  btn-ghost" onClick={logOut}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </li> */}
    </>
  );

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className=" py-8 flex lg:flex-row flex-row-reverse  justify-between  pb-5 mb-5">
      <div className="flex  items-center gap-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className=" lg:hidden">
            <FaBars className="text-2xl "></FaBars>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] shadow  rounded-box bg-[#F7F7F7] w-52 text-textColor absolute -left-[120px] -top-5 "
          >
            {user ? navLinks : navlinksBeforeLogin}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          {/* <img
            className="w-[50px] lg:w-[50px]"
            src="https://i.ibb.co/cwFBJD2/Untitled-design.png"
          ></img> */}
          <h2 className="text-xl hidden lg:block font-extrabold ">
            {" "}
            Admission
          </h2>
        </div>
      </div>

      <div className="flex  items-center hidden lg:block    p-3 rounded">
        <ul className=" lg:flex gap-3 ">
          {user ? navLinks : navlinksBeforeLogin}
        </ul>
      </div>

      <div className="">
        {user ? (
          <div className="dropdown  lg:block dropdown-end">
            <div className="flex gap-3 items-center">
              <div className="">
                <Link to={`/profile`}>
                  <h2 className="  cursor-pointer font-semibold">
                    {user?.displayName}
                  </h2>
                </Link>
              </div>

              <div>
                <button
                  onClick={handleLogOut}
                  className="text-sm flex items-center gap-1  font-semibold  "
                >
                  Logout <HiOutlineLogout className="text-xl"></HiOutlineLogout>
                </button>
              </div>
            </div>
            {/* <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow rounded-box bg-[#F7F7F7]  "
            >
              <li className="  py-1 px-1 rounded-xl   text-center">
                {user?.displayName}
              </li>
            </ul> */}
          </div>
        ) : (
          <button className="mt-1">
            <NavLink
              to="/login"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "navBarActiveLi"
                  : " navBarActiveLi"
              }
            >
              Log in
            </NavLink>
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
