import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../authProvider/AuthProvider";

const Login = () => {
  const {
    signInUser,
    createUser,
    githubSignIn,
    facebookSignIn,
    googleSignIn,
    handleUpdateProfile,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  //   console.log(user)
  const [toogle, setToogle] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photo = form.get("photo-url");
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
      createUser(email, password)
        .then((res) => {
          console.log(res.user);
          new Swal(
            "Thank you!",
            "You have successfully completed your registration!",
            "success"
          );
          navigate("/");
          handleUpdateProfile(name, photo).then(() => {
            console.log("user created");
          });
        })
        .catch((error) => console.log(error));
    }
  };

  const handleSignInUser = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    signInUser(email, password)
      .then((res) => {
        navigate("/");
        console.log(res.user);
      })
      .catch((error) => console.log(error));
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        navigate("/");
        console.log(res.user);
        new Swal("Login Successful!", "Welcome back!", "success");
      })
      .catch((error) => console.log(error));
  };

  if (toogle) {
    return (
      <>
        <div className="mt-20  flex lg:flex-row flex-col-reverse justify-center gap-14 lg:gap-20">
          <div className="flex-1">
            <div className="lg:w-5/6 mx-auto">
              <form onSubmit={handleLogin} className=" rounded  ">
                <h2 className="mb-2 text-textColor uppercase    text-3xl  font-extrabold text-center">
                  Create account
                </h2>
                <div className="flex">
                  <div
                    onClick={() => facebookSignIn()}
                    className="rounded-xl cursor-pointer max-w-max mx-auto  justify-center flex items-center gap-2 mt-2  px-8 py-2 text-base border border-[#C5C5C5] bg-[#FFF]"
                  >
                    <div className="flex items-center gap-2">
                      <FaFacebook className="text-2xl"></FaFacebook>
                    </div>
                  </div>
                  <div
                    onClick={() => githubSignIn()}
                    className="rounded-xl cursor-pointer max-w-max mx-auto  justify-center flex items-center gap-2 mt-2  px-8 py-2 text-base border border-[#C5C5C5] bg-[#FFF]"
                  >
                    <div className="flex items-center gap-2">
                      <FaGithub className="text-2xl"></FaGithub>
                    </div>
                  </div>

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
                    <div>
                      <input
                        className="border-[#C5C5C5] bg-[#FFF]  py-3 outline-none w-full mx-auto border b block pl-2 pb-3 mb-5"
                        type="email"
                        placeholder="Username or Email"
                        name="email"
                        required
                      />
                    </div>

                    <div className="relative mb-5">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        className="input border border-[#C5C5C5]  py-3 outline-none block pl-2 pb-3  bg-[#FFF] w-full mx-auto"
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
                <div
                  onClick={handleGoogleLogin}
                  className="rounded-xl cursor-pointer max-w-max mx-auto  justify-center flex items-center gap-2 mt-2  px-8 py-2 text-base border border-[#C5C5C5] bg-[#FFF]"
                >
                  <div className="flex items-center gap-2">
                    <FcGoogle className="text-2xl"></FcGoogle>
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

                <p>For</p>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Login;
