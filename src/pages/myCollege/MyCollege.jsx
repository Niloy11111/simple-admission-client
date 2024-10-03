import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import useAxiosPublic from "../../hooks/UseAxiosPublic";

const MyCollege = () => {
  const axiosPublic = useAxiosPublic();
  const { user, firebaseUser, logOut } = UseAuth();
  const [mycollege, setMyCollege] = useState({});
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

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/allColleges/nameOfCollege/${user?.collegeName}`
      )
      .then((data) => setMyCollege(data.data));
  }, [user?.collegeName]);

  return (
    <div className="my-20">
      {mycollege ? (
        <div key={mycollege._id}>
          <div className="flex flex-col lg:flex-row gap-10">
            <div>
              <img
                className="lg:w-[700px]"
                src={mycollege.collegeImage}
                alt=""
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold mb-3">Add a Review</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                  className="outline-none border-[#444] border w-[280px] lg:w-[600px]  mb-3 pl-2 pt-2  text-sm"
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
          <h1 className="name mt-10">{mycollege.collegeName}</h1>
          <p className="mt-5">{mycollege.researchHistory}</p>
        </div>
      ) : (
        "You have not addmitted "
      )}
    </div>
  );
};

export default MyCollege;
