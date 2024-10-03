import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import useUsers from "../../hooks/UseUsers";

const Login = () => {
  const { githubSignIn, facebookSignIn, googleSignIn, setUser } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [toogle, setToogle] = useState(true);
  const githubEmailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [users, , refetch] = useUsers();
  const handleRegsiter = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photoURL = form.get("photo-url");
    const accepted = e.target.terms.checked;

    if (!/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
      new Swal(
        "Sorry !",
        "Password Should be minimum 6 characters and should have one Capital and Special letter!",
        "error"
      );
    } else if (!accepted) {
      new Swal("Sorry !", " please accept our terms and conditions !", "error");
    } else {
      const user = {
        photoURL,
        name,
        email,
        password,
        address: "",
        number: "",
        subject: "",
        birthDate: "",
        collegeName: null,
        collegeImage: "",
        admissionDate: "",
        admissionProcess: "",
        events: "",
        researchHistory: "",
        sports: "",
        sportsCategories: "",
        researchWorks: "",
        collegeRating: "",
        numberOfResearch: "",
      };

      const exist = users.find((item) => item.email === user.email);

      if (exist) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "already exist",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axiosPublic
          .post("/users", user)
          .then((data) => {
            if (data.data.insertedId) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registered Successfully, Login Please",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    e.currentTarget.reset();
  };

  const handleSignInUser = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const currentUser = users.find(
      (user) => user.email === email && user.password === password
    );
    const isExist =
      currentUser?.email === email && currentUser.password === password;
    if (isExist) {
      setUser(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        navigate("/");
        console.log(res.user);
        new Swal("Login Successful!", "Welcome back!", "success");
        const user = {
          photoURL: res?.user?.photoURL,
          name: res?.user?.displayName,
          email: res?.user?.email,
          password: "",
          address: "",
          number: "",
          subject: "",
          birthDate: "",
          collegeName: null,
          collegeImage: "",
          admissionDate: "",
          admissionProcess: "",
          events: "",
          researchHistory: "",
          sports: "",
          sportsCategories: "",
          researchWorks: "",
          collegeRating: "",
          numberOfResearch: "",
        };

        const exist = users.find((item) => item.email === user.email);

        if (exist) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "already exist",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          axiosPublic
            .post("/users", user)
            .then((data) => {
              if (data.data.insertedId) {
                navigate("/login");
                refetch();
                setUser(user);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => console.log(error));
  };

  const handleGithubLogin = () => {
    const inputValue = githubEmailRef.current.value;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(inputValue)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Invalid email",
        text: "Please enter a valid email address",
      });
      return;
    }

    githubSignIn()
      .then((res) => {
        navigate("/");
        console.log(res.user);
        new Swal("Login Successful!", "success");
        const user = {
          photoURL: res?.user?.photoURL,
          name: res?.user?.displayName,
          email: inputValue,
          password: "",
          address: "",
          number: "",
          subject: "",
          birthDate: "",
          collegeName: null,
          collegeImage: "",
          admissionDate: "",
          admissionProcess: "",
          events: "",
          researchHistory: "",
          sports: "",
          sportsCategories: "",
          researchWorks: "",
          collegeRating: "",
          numberOfResearch: "",
        };

        setUser(user);

        const exist = users.find((item) => item.email === inputValue);

        console.log("exist", exist);

        if (exist) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "already exist",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          axiosPublic
            .post("/users", user)
            .then((data) => {
              if (data.data.insertedId) {
                navigate("/login");
                refetch();
                setUser(user);
                localStorage.setItem("currentUser", JSON.stringify(user));
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => console.log(error));
  };

  if (toogle) {
    return (
      <>
        <div className="mt-20  flex lg:flex-row flex-col-reverse justify-center gap-14 lg:gap-20">
          <div className="flex-1">
            <div className="lg:w-5/6 mx-auto">
              <form onSubmit={handleRegsiter} className=" rounded  ">
                <h2 className="mb-2 text-textColor uppercase    text-3xl  font-extrabold text-center">
                  Create account
                </h2>
                <div className="flex">
                  <div
                    className="rounded-xl cursor-pointer max-w-max mx-auto  justify-center flex items-center gap-2 mt-2  px-8 py-2 text-base border border-[#C5C5C5] bg-[#FFF]"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FaGithub className="text-2xl"></FaGithub>
                    </div>
                  </div>

                  <dialog id="my_modal_1" className="modal">
                    <div>
                      <div className="modal-box">
                        <input
                          id="githubEmail"
                          className="modalField"
                          required
                          type="email"
                          required
                          placeholder="Your Name"
                          ref={githubEmailRef}
                        />

                        <button
                          onClick={handleGithubLogin}
                          className="mt-5 buttonOrange px-5 py-2 rounded-lg"
                          type="submit"
                        >
                          Submit
                        </button>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn text-white btn-sm btn-accent">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </dialog>

                  <div
                    onClick={handleGoogleLogin}
                    className="rounded-xl cursor-pointer max-w-max mx-auto  justify-center flex items-center gap-2 mt-2  px-8 py-2 text-base border border-[#C5C5C5] bg-[#FFF]"
                  >
                    <div className="flex items-center gap-2">
                      <FcGoogle className="text-2xl"></FcGoogle>
                    </div>
                  </div>
                </div>
                <p className="mt-4 mb-2">Or use your email address</p>

                <div>
                  <input
                    className="border-[#C5C5C5] pl-2 bg-[#FFF]   py-3 outline-none  block border pb-3 mb-5 w-full mx-auto"
                    type="text"
                    placeholder="Your Name"
                    name="name"
                  />
                  <input
                    className="border-[#C5C5C5] bg-[#FFF] border  pl-2  py-3 outline-none w-full mx-auto block border-b pb-3 mb-4"
                    type="text"
                    placeholder="Photo URL"
                    name="photo-url"
                    required
                  />

                  <div className="flex lg:flex-row flex-col lg:gap-3">
                    <div className="w-full">
                      <input
                        className="border-[#C5C5C5] bg-[#FFF]  py-3 outline-none w-full mx-auto border b block pl-2 pb-3 mb-5"
                        type="email"
                        placeholder="Username or Email"
                        name="email"
                        required
                      />
                    </div>

                    <div className="w-full relative mb-5">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        className=" border border-[#C5C5C5]  py-3 outline-none block pl-2 pb-3  bg-[#FFF] w-full mx-auto"
                        name="password"
                        required
                      />

                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xl cursor-pointer absolute top-3 right-2"
                      >
                        {showPassword ? (
                          <AiFillEye></AiFillEye>
                        ) : (
                          <AiFillEyeInvisible></AiFillEyeInvisible>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-3  ">
                  <div className="text-sm uppercase font-bold">
                    <input type="checkbox" name="terms" id="terms" />
                    <label className="mt-2  "> Accept our </label>
                    <a className="text-textColor ">Terms and Conditions</a>
                  </div>
                </div>

                <button className=" py-3 mx-auto w-full border border-[#444]  bg-texttext-textColor mb-4 hover:bg-textColor hover:text-white   font-bold uppercase  transition-all duration-500">
                  Register
                </button>

                <p className="text-center font-medium text-sm uppercase   ">
                  Already have an account?{" "}
                  <a
                    onClick={() => setToogle(!toogle)}
                    className="text-textColor font-semibold cursor-pointer"
                  >
                    {" "}
                    Login{" "}
                  </a>{" "}
                </p>
              </form>
            </div>
          </div>

          <div className="flex-1  transition-all duration-500  flex justify-centkeer items-center">
            <div className="w-5/6 mx-auto shadow-2xl  rounded-3xl">
              <img
                className=" "
                src="https://i.ibb.co/vq8ZGc7/lock-isometric-icon-isolated-white-background-3d-isometric-red-color-padlock-sign-safety-concept-mob.png"
              ></img>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="mt-20  flex lg:flex-row flex-col  justify-center gap-16 lg:gap-20">
          <div className="flex-1  transition-all duration-500  flex justify-center items-center">
            <div className=" shadow-2xl  rounded-3xl">
              <img
                className=" "
                src="https://i.ibb.co/4PwY2r3/download-2.png"
              ></img>
            </div>
          </div>

          <div className="flex-1">
            <div className="lg:w-4/6 mx-auto">
              <form onSubmit={handleSignInUser} className="">
                <h2 className="mb-2 text-textColor uppercase    text-3xl font-extrabold text-center">
                  Log In
                </h2>
                <div className="flex gap-4">
                  <div
                    className="rounded-xl cursor-pointer max-w-max mx-auto  justify-center flex items-center gap-2 mt-2  px-8 py-2 text-base border border-[#C5C5C5] bg-[#FFF]"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FaGithub className="text-2xl"></FaGithub>
                    </div>
                  </div>

                  <dialog id="my_modal_1" className="modal">
                    <div>
                      <div className="modal-box">
                        <input
                          id="githubEmail"
                          className="modalField"
                          required
                          type="email"
                          required
                          placeholder="Your Name"
                          ref={githubEmailRef}
                        />

                        <button
                          onClick={handleGithubLogin}
                          className="mt-5 buttonOrange px-5 py-2 rounded-lg"
                          type="submit"
                        >
                          Submit
                        </button>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn text-white btn-sm btn-accent">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </dialog>

                  <div
                    onClick={handleGoogleLogin}
                    className="rounded-xl cursor-pointer max-w-max mx-auto  justify-center flex items-center gap-2 mt-2  px-8 py-2 text-base border border-[#C5C5C5] bg-[#FFF]"
                  >
                    <div className="flex items-center gap-2">
                      <FcGoogle className="text-2xl"></FcGoogle>
                    </div>
                  </div>
                </div>

                <p className="mt-4 mb-2">Or use your email address</p>

                <div>
                  <input
                    className="border-[#C5C5C5] bg-[#FFF] border  pl-2  py-3 outline-none w-full mx-auto block border-b pb-3 mb-4"
                    type="emial"
                    placeholder="Username or Email"
                    name="email"
                    required
                  />

                  <input
                    className="border-[#C5C5C5] bg-[#FFF] border  pl-2  py-3 outline-none w-full mx-auto block border-b pb-3 mb-4"
                    type="password"
                    placeholder="password"
                    name="password"
                    required
                  />
                </div>

                <button className=" py-3 mx-auto w-full border border-[#444]  bg-texttext-textColor mb-4 hover:bg-textColor hover:text-white   font-bold uppercase  transition-all duration-500">
                  Login
                </button>

                <p className="text-center font-medium text-sm uppercase   ">
                  Don't have an account?{" "}
                  <a
                    onClick={() => setToogle(!toogle)}
                    className="text-textColor font-semibold cursor-pointer"
                  >
                    {" "}
                    Create an Account
                  </a>{" "}
                </p>

                <div className="flex gap-3 justify-center">
                  <p>Forgot Password ? </p>{" "}
                  <Link
                    to={`/passwordReset`}
                    className="text-textColor font-semibold cursor-pointer"
                  >
                    Reset
                  </Link>{" "}
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Login;
