import UseColleges from "../../hooks/UseColleges";
import College from "./college/College";

const AllColleges = () => {
  const [colleges] = UseColleges();

  return (
    <div className="grid grid-cols-3 gap-12 mt-20">
      {colleges.map((college) => (
        <College key={college._id} college={college} />
      ))}
    </div>
  );
};

export default AllColleges;
