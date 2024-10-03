import { Link } from "react-router-dom";

const Card = ({ card }) => {
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
  } = card;
  return (
    <div className="mb-10">
      <div className="flex flex-col lg:flex-row items-center  gap-10">
        <div>
          <img className="w-[700px] " src={collegeImage} alt="" />
        </div>
        <div>
          <h2 className="name">{collegeName}</h2>
          <p className="buttonOrange">Admission {admissionDate}</p>
          <div className="">
            <h2 className="font-semibold my-2 text-xl">Types of Events</h2>
            {events.map((event, index) => (
              <span key={index} className=" mr-5">
                {event.name}
              </span>
            ))}{" "}
          </div>
          <h2 className="font-semibold my-2 text-xl">Sports</h2>
          <div className="flex  gap-5  mr-5">
            <p className=" underline "> {sports[0]} </p>
            <p className=" underline"> {sports[1]} </p>
          </div>
          <Link to={`/details/${_id}`}>
            <button className="mt-10 transition-all duration-500 buttonOrange  border py-2 w-full ">
              Details
            </button>
          </Link>
        </div>
      </div>
      <h2 className="mt-10 mb-5 subName">Research History of {collegeName}</h2>
      <p className=" "> {researchHistory} </p>
    </div>
  );
};

export default Card;
