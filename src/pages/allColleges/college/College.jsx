import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";
const College = ({ college }) => {
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
  } = college;

  return (
    <div className="">
      <div>
        <img className="w-full h-[270px]" src={collegeImage} alt="" />
      </div>
      <div className="my-4 flex justify-between">
        <h4 className="">{collegeName}</h4>
        <Rating
          className=""
          style={{ maxWidth: 130 }}
          value={collegeRating}
          readOnly
        />
      </div>
      <div className="my-4 flex justify-between">
        <p className="">{admissionDate}</p>
        <p className=""> -- {numberOfResearch}</p>
      </div>

      <Link to={`/details/${_id}`}>
        <button className="buttonOrange w-full py-2 ">Details</button>
      </Link>
    </div>
  );
};

export default College;
