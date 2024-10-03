import { useContext } from "react";
import { AuthContext } from "../../../authProvider/AuthProvider";
import UseColleges from "../../../hooks/UseColleges";
import Card from "./Card";

const Cards = () => {
  const [colleges] = UseColleges();
  const { user, logOut, collegeData } = useContext(AuthContext);

  return (
    <div>
      <h1 className="headTitle ">
        Top <span className="text-textColor">Colleges</span>{" "}
      </h1>
      <div>
        {collegeData.length > 0
          ? collegeData.map((item) => <Card key={item?._id} card={item} />)
          : colleges
              .slice(0, 3)
              .map((item) => <Card key={item?._id} card={item} />)}
      </div>
    </div>
  );
};

export default Cards;
