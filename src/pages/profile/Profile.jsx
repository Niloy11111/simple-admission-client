import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../authProvider/AuthProvider";
import useAxiosPublic from "../../hooks/UseAxiosPublic";

const Profile = () => {
  const { user, firebaseUser, setUser } = useContext(AuthContext);
  // const [user, setEditedUser] = useState(user);
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmitEdit = async (data) => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const updatedUser = {
      ...storedUser,
      name: data?.name,
      email: data?.email,
      collegeName: data?.collegeName,
      address: data?.address,
    };

    try {
      const candidateRes = await axiosPublic.patch(
        `/addCandidateInfoAsUserInfo/${
          firebaseUser.email ? firebaseUser.email : user?.email
        }`,
        updatedUser
      );

      if (candidateRes.data.modifiedCount > 0) {
        // refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Info has been updated`,
          showConfirmButton: false,
          timer: 1500,
        });
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error updating info:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-10 py-3 px-5">
        <h1 className="subName border-textColor text-textColor border px-5 py-3 rounded">
          {!user ? firebaseUser?.displayName : user?.name}
        </h1>
        <h3 className="subName border-textColor text-textColor border px-5 py-3 rounded">
          {!user ? firebaseUser?.email : user?.email}
        </h3>

        <div className="flex flex-col lg:flex-row gap-10">
          <h3 className="subName border-textColor text-textColor border px-5 py-3 rounded">
            University :{" "}
            {user?.collegeName ? user?.collegeName : "not admitted"}
          </h3>

          {user?.address ? (
            <h3 className="subName border-textColor text-textColor border px-5 py-3 rounded">
              {user?.address}
            </h3>
          ) : (
            ""
          )}

          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="buttonOrange ml-6 px-8 w-[100px] mx-auto py-2 mt-2"
          >
            Edit
          </button>

          <dialog id="my_modal_1" className="modal">
            <div>
              <form className="modal-box" onSubmit={handleSubmit(onSubmitEdit)}>
                <input
                  className="modalField"
                  defaultValue={user?.name}
                  required
                  type="text"
                  placeholder="Your Name"
                  {...register("name")}
                />

                <input
                  className="modalField"
                  defaultValue={user?.email}
                  required
                  type="text"
                  placeholder="Your Email"
                  {...register("email")}
                />
                {user?.collegeName && (
                  <input
                    {...register("collegeName")}
                    className="modalField"
                    defaultValue={user?.collegeName}
                    type="text"
                    placeholder="University"
                  />
                )}
                {user?.address && (
                  <input
                    {...register("address")}
                    className="modalField"
                    defaultValue={user?.address}
                    type="text"
                    placeholder="Address"
                  />
                )}
                <button
                  className="mt-5 buttonOrange px-5 py-2 rounded-lg"
                  type="submit"
                >
                  Edit
                </button>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn text-white btn-sm btn-accent">
                      Close
                    </button>
                  </form>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
