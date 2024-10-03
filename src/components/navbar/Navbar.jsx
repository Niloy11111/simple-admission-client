import { signOut } from "firebase/auth";
import { FaBars } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import UseAuth from "../../hooks/UseAuth";

const NavBar = () => {
  const { user, firebaseUser, setUser } = UseAuth();
  const navigate = useNavigate();

  console.log(firebaseUser);

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
    </>
  );

  const handleLogOut = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem("currentUser");
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
            {user || firebaseUser ? navLinks : navlinksBeforeLogin}
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
          {user || firebaseUser ? navLinks : navlinksBeforeLogin}
        </ul>
      </div>

      <div className="">
        {user || firebaseUser ? (
          <div className="dropdown  lg:block dropdown-end">
            <div className="flex gap-3 items-center">
              <div className="">
                <Link to={`/profile`}>
                  <h2 className="  cursor-pointer font-semibold">
                    {!user ? firebaseUser?.displayName : user?.name}
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
