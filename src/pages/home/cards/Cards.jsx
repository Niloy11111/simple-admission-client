import { useContext } from "react";
import { AuthContext } from "../../../authProvider/AuthProvider";
import UseColleges from "../../../hooks/UseColleges";
import Card from "./Card";

const Cards = () => {
  const [colleges] = UseColleges();
  const { user, logOut, collegeData } = useContext(AuthContext);

  console.log("i am", collegeData.length);
  return (
    <div>
      <h1 className="headTitle ">
        Top <span className="text-textColor">Colleges</span>{" "}
      </h1>
      <div>
        {collegeData.length > 0
          ? collegeData.map((item) => <Card card={item} />)
          : colleges.slice(0, 3).map((item) => <Card card={item} />)}
      </div>
    </div>
  );
};

export default Cards;
