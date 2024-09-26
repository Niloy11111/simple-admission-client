import UseColleges from "../../hooks/UseColleges";
import College from "./college/College";

const AllColleges = () => {
  const [colleges] = UseColleges();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 my-20">
      {colleges.map((college) => (
        <College key={college._id} college={college} />
      ))}
    </div>
  );
};

export default AllColleges;
