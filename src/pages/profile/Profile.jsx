import React, { useContext } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";

const Profile = () => {
  const { user, logOut, mycollege } = useContext(AuthContext);

  return (
    <div>
      <div className="flex  flex-col gap-10 r   py-3 px-5">
        <h1 className="subName bg-textColor text-white  px-5 py-3 rounded">
          {user?.displayName}
        </h1>
        <h3 className="subName bg-textColor text-white  px-5 py-3 rounded">
          {user?.email}
        </h3>
        {mycollege ? (
          <div className="flex flex-col lg:flex-row gap-10">
            <h3 className="subName bg-textColor text-white  px-5 py-3 rounded">
              {mycollege[0].collegeName}
            </h3>
            <h3 className="subName bg-textColor text-white  px-5 py-3 rounded">
              {mycollege[0].address}
            </h3>
          </div>
        ) : (
          ""
        )}
      </div>

      <button className="buttonOrange ml-6 px-8 w-[100px] mx-auto py-2 mt-2">
        Edit
      </button>
    </div>
  );
};

export default Profile;
