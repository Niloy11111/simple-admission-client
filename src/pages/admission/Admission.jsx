import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import UseColleges from "../../hooks/UseColleges";
const Admission = () => {
  const navigate = useNavigate();
  const [colleges] = UseColleges();
  const axiosPublic = useAxiosPublic();
  const [activeCircle, setActiveCircle] = useState(null);
  let [isOpen, setIsOpen] = useState(false);
  const [currentCollege, setCorrentCollege] = useState({});

  const {
    _id,
    collegeName,
    collegeImage,
    admissionDate,
    admissionProcess,
    events,
    researchHistory,
    sports,
    sportsCategories,
    researchWorks,
    collegeRating,
    numberOfResearch,
  } = currentCollege;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleAddInfo = async (e) => {
    e.preventDefault();
    const form = e.target;
    const photoURL = form.photoURL.value;
    const name = form.name.value;
    const email = form.email.value;
    const address = form.address.value;
    const number = form.number.value;
    const subject = form.subject.value;
    const birthDate = form.birthDate.value;

    const candidateInfo = {
      photoURL,
      name,
      email,
      address,
      number,
      subject,
      birthDate,
      collegeName,
      collegeImage,
      admissionDate,
      admissionProcess,
      events,
      researchHistory,
      sports,
      sportsCategories,
      researchWorks,
      collegeRating,
      numberOfResearch,
      currentId: _id,
    };

    const candidateRes = await axiosPublic.post(
      "/addCandidateInfo",
      candidateInfo
    );
    if (candidateRes.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `is added`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/myCollege");
    }
  };

  //   const onSubmitAddMeal = async (data) => {
  //     let date;

  //     if (data.date) {
  //       date = parseISO(data.date);
  //     } else {
  //       date = new Date();
  //     }

  //     const formattedDateTime = format(date, "MMMM d 'at' h:mm a");
  //     console.log(formattedDateTime);
  //     const ingredientsArray = data.ingredients
  //       .split(", ")
  //       .map((ingredient) => ingredient.trim());

  //     const defaultRating = 0;
  //     const defaultLikes = 0;
  //     const defaultReviews = 0;

  //     const mealInfo = {
  //       name: data.name,
  //       category: data.category,
  //       price: parseFloat(data.price),
  //       postTime: formattedDateTime,
  //       rating: data.rating ? parseFloat(data.rating) : defaultLikes,
  //       likes: data.like ? parseFloat(data.like) : defaultLikes,
  //       review: data.review ? parseFloat(data.review) : defaultReviews,
  //       adminName: data.adminName,
  //       adminEmail: data.adminEmail,
  //       ingredient: ingredientsArray,
  //       description: data.description,
  //       image: data.image,
  //     };
  //     const mealRes = await axiosPublic.post("/meals", mealInfo);

  //     if (mealRes.data.insertedId) {
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: `${data.name} is added`,
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   };

  return (
    <div>
      <h1 className="name text-center">Exlpore Colleges</h1>

      <div onClick={openModal} className="bookmarkContainer cursor-pointer">
        <div className="w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-2 mt-16 ">
          {colleges.map((item) => (
            <div
              onClick={() => setCorrentCollege(item)}
              className="buttonOrange py-5 text-center"
              key={item?._id}
            >
              <h2>{item?.collegeName}</h2>
            </div>
          ))}
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-[700px] transform overflow-hidden rounded-2xl bg-white p-7 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Favorite
                  </Dialog.Title>
                  <form onSubmit={handleAddInfo} className=" mt-2">
                    <div className="flex gap-10">
                      <div>
                        <div>
                          <h2 className="fieldTitle">Candidate Name</h2>
                          <div className="mt-1">
                            <input
                              name="name"
                              id="field-id"
                              className="modalField"
                              required
                              type="text"
                              placeholder="Your Name"
                            />
                          </div>
                        </div>
                        <div>
                          <h2 className="fieldTitle">Email</h2>
                          <div className="mt-1">
                            <input
                              name="email"
                              id="field-id"
                              className="modalField"
                              required
                              type="text"
                              placeholder="Your Email"
                            />
                          </div>
                        </div>
                        <div>
                          <h2 className="fieldTitle">Phone</h2>
                          <div className="mt-1">
                            <input
                              name="number"
                              id="field-id"
                              className="modalField"
                              required
                              type="number"
                              placeholder="Your Number"
                            />
                          </div>
                        </div>
                        <div>
                          <h2 className="fieldTitle">Address</h2>
                          <div className="mt-1">
                            <input
                              name="address"
                              id="field-id"
                              className="modalField"
                              required
                              type="text"
                              placeholder="Your Address"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h2 className="fieldTitle">Subject Name</h2>
                          <div className="mt-1">
                            <input
                              name="subject"
                              id="field-id"
                              className="modalField"
                              required
                              type="text"
                              placeholder="Your Subject"
                            />
                          </div>
                        </div>
                        <div>
                          <h2 className="fieldTitle">Date of Birth</h2>
                          <div className="mt-1">
                            <input
                              name="birthDate"
                              id="field-id"
                              className="modalField"
                              required
                              type="date"
                              placeholder="Your Birthday"
                            />
                          </div>
                        </div>
                        <div>
                          <h2 className="fieldTitle">Photo URL</h2>
                          <div className="mt-1">
                            <input
                              name="photoURL"
                              id="field-id"
                              className="modalField"
                              required
                              type="text"
                              placeholder="Your Photo"
                            />
                          </div>
                        </div>

                        <button className="bg-textColor px-14 py-2 w-full mt-12 rounded text-white">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* <div className="flex mt-5 justify-center gap-5">
                    <button
                      onClick={closeModal}
                      className="bg-[#EDEDED] px-12 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={closeModal}
                      className="bg-textColor px-14 py-2 rounded text-white"
                    >
                      Submit
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Admission;
