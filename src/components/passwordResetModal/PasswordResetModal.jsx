import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../authProvider/AuthProvider";
import useAxiosPublic from "../../hooks/UseAxiosPublic";

const PasswordResetModal = () => {
  const [email, setEmail] = useState("");
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmitResetPassword = async (data) => {
    const updatedPassword = {
      password: data?.password,
    };
    const email = data?.email;

    try {
      const response = await axiosPublic.patch(
        `/resetPassword/${email}`,
        updatedPassword
      );

      if (response.data.modifiedCount > 0) {
        // refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Password has been updated`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitResetPassword)}>
        <input
          className="modalField block"
          defaultValue={user?.name}
          required
          type="email"
          placeholder="email"
          {...register("email")}
        />
        <input
          className="modalField block mb-3"
          defaultValue={user?.name}
          required
          type="text"
          placeholder="New Password"
          {...register("password")}
        />
        <button className="buttonOrange  px-5 py-2 rounded-lg">Reset</button>
      </form>
    </div>
  );
};

export default PasswordResetModal;
