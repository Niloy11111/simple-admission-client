import React, { useContext } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";

const Profile = () => {
  const { user, logOut, mycollege } = useContext(AuthContext);

  return (
    <div>
      <div className="flex gap-10 bg-textColor text-white py-3 px-5">
        <h1 className="subName">{user?.displayName}</h1>
        <h3 className="subName">{user?.email}</h3>
        {mycollege ? (
          <div className="flex gap-10">
            <h3 className="subName">{mycollege[0].collegeName}</h3>
            <h3 className="subName">{mycollege[0].address}</h3>
          </div>
        ) : (
          ""
        )}
      </div>

      <button className="buttonOrange px-8 w-[100px] mx-auto py-2 mt-2">
        Edit
      </button>
    </div>
  );
};

export default Profile;
