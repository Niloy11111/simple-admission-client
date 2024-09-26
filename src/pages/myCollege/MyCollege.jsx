import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../authProvider/AuthProvider";
import useAxiosPublic from "../../hooks/UseAxiosPublic";

const MyCollege = () => {
  const axiosPublic = useAxiosPublic();
  const { user, mycollege, logOut } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const userEmail = user?.email;
    const name = user?.displayName;
    const review = data.review;

    const reviewInfo = {
      userEmail,
      name,
      review,
    };
    axiosPublic.post(`/reviews`, reviewInfo).then((data) => {
      if (data.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have added a Review",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // console.log(mycollege[0].collegeName);

  return (
    <div className="mt-20">
      {mycollege ? (
        mycollege.map((item) => (
          <div key={mycollege[0]._id}>
            <div className="flex gap-10">
              <div>
                <img
                  className="w-[700px]"
                  src={mycollege[0].collegeImage}
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-3xl font-semibold mb-3">Add a Review</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    className="outline-none border-[#444] border w-[370px] lg:w-[600px]  mb-3 pl-2 pt-2  text-sm"
                    {...register("review", { required: true })}
                    id=""
                    cols="50"
                    rows="4"
                  ></textarea>

                  <div className="lg:justify-normal">
                    <button className="btnAll px-6 lg:px-8 py-1 lg:py-2   font-medium   rounded buttonOrange">
                      <span className=""> Make Review</span>
                    </button>{" "}
                  </div>
                </form>
              </div>
            </div>
            <h1 className="name mt-10">{mycollege[0].collegeName}</h1>
            <p className="mt-5">{mycollege[0].researchHistory}</p>
          </div>
        ))
      ) : (
        <div>data is not availabe</div>
      )}
    </div>
  );
};

export default MyCollege;
