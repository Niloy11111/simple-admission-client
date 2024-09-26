import { useEffect, useState } from "react";

const Graduates = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("/data.json");
  }, []);

  return (
    <div>
      <h1 className="headTitle">Gallary</h1>

      <div className="grid lg:grid-cols-3  ">
        {groups.map((group) => (
          <div key={group?.id}>
            <div>
              <img className=" w-full h-[270px]" src={group.img} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Graduates;
