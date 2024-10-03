import { useLoaderData, useNavigate } from "react-router-dom";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Event from "./event/Event";
import Research from "./research/Research";
import Category from "./sportsCategory/Category";
const CollegeDetails = () => {
  const collegeDetails = useLoaderData();

  const {
    _id,
    collegeName,
    collegeImage,
    admissionDate,
    admissionProcess: { overview, detailedSteps, operationalDetails, fees },
    events,
    researchHistory,
    sports,
    sportsCategories,
    researchWorks,
    collegeRating,
    numberOfResearch,
  } = collegeDetails;
  const navigate = useNavigate();
  return (
    <>
      <div className="my-20 ">
        <div className="flex lg:flex-row flex-col gap-20 ">
          <div className="">
            <img className="lg:w-[700px]" src={collegeImage} alt="" />
          </div>

          <div className="space-y-2 ">
            <h3 className="text-3xl font-semibold">{collegeName}</h3>
            <p>Admisson will be held on {admissionDate}</p>
            <p>Total Research Papers {numberOfResearch}</p>
            <div className=" flex ">
              <Rating
                className=""
                style={{ maxWidth: 290 }}
                value={collegeRating}
                readOnly
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="mt-20 text-3xl font-semibold  text-center">
            {collegeName} Admission Process
          </h1>

          <p className=" text-center">{overview}</p>

          <div className="mt-10">
            <span className="buttonOrange px-2 ">Follow these steps</span>
            <ol>
              {detailedSteps.map((step, index) => (
                <li className="my-2" key={index}>
                  {" "}
                  {index + 1} {step}
                </li>
              ))}
            </ol>

            <p className="buttonOrange max-w-max px-2">{fees}</p>
          </div>

          <p>{operationalDetails}</p>
        </div>

        <div className="">
          <h1 className="mt-20 text-3xl text-center font-semibold  ">
            {collegeName} Events
          </h1>

          <div className="mt-10 flex lg:flex-row flex-col justify-center  gap-20 ">
            {events.map((event, index) => (
              <Event key={index} event={event} />
            ))}
          </div>
        </div>

        <div className="my-20">
          <h1 className=" text-3xl text-center font-semibold  ">
            {collegeName} Research Works
          </h1>

          <div className="mt-10 flex lg:flex-row flex-col justify-center  gap-20 ">
            {researchWorks.map((research, index) => (
              <Research key={index} research={research} />
            ))}
          </div>
        </div>

        <div className="mt-20 lg:mt-60 lg:mb-60 ">
          <h1 className=" text-3xl text-center font-semibold  ">
            {collegeName} Sports
          </h1>

          <div className="mt-10  flex lg:flex-row flex-col justify-center  gap-20 ">
            {sportsCategories.map((category, index) => (
              <Category key={index} category={category} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeDetails;
