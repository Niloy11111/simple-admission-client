import { useContext } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { AuthContext } from "../../../authProvider/AuthProvider";
import UseColleges from "../../../hooks/UseColleges";

const Banner = () => {
  const [refetch] = UseColleges();
  const { register, handleSubmit } = useForm();
  const { setCollegeData } = useContext(AuthContext);

  const onSubmit = async (data) => {
    fetch(`http://localhost:5000/allColleges?collegeName=${data.collegeName}`)
      .then((res) => res.json())
      .then((data) => setCollegeData(data));

    refetch();
  };

  return (
    <div className="">
      <div className="flex lg:flex-row flex-col-reverse   items-center gap-12 lg:gap-20 lg:h-[70vh]  mt-10 lg:mt-0">
        <div className=" h-full flex-1  flex items-center">
          <div className=" ">
            <h2 className=" text-3xl  text-center lg:text-left lg:text-4xl  font-extrabold uppercase ">
              Apply to be <span className="textColor">Great</span>
            </h2>
            <p className="text-center lg:text-left mt-2 lg:mt-6  text-[#494e5d]">
              Discover your path to higher education where your ambitions and
              academic goals align seamlessly. Find colleges that match your
              interests and career aspirations, with valuable resources to guide
              you through the admission process. Explore a range of programs,
              access crucial information, and make informed decisions about your
              future. Start your journey to academic success today!
            </p>
            <div className="flex md:justify-center lg:justify-normal">
              <div className="flex items-center  mt-4 lg:mt-8 relative">
                <form onSubmit={handleSubmit(onSubmit)} className=" " action="">
                  <input
                    {...register("collegeName", { required: true })}
                    name="collegeName"
                    id="field-id"
                    className="pl-8 w-[180px] md:w-[300px] border border-[#444]  py-2 outline-none bg-white"
                    type="text"
                    placeholder="Find University"
                  />
                  <button className="ml-2 lg:ml-4 px-4 lg:px-7 py-2.5 border border-[#444]  duration-300 ">
                    Explore
                  </button>
                </form>
                <BsSearch className="absolute left-3 "></BsSearch>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 ">
          <div>
            <img
              className="rounded-xl"
              src="https://www.usnews.com/dims4/USNEWS/65ef27a/2147483647/crop/2119x1413+0+5/resize/970x647/quality/85/?url=https%3A%2F%2Fwww.usnews.com%2Fcmsmedia%2F0e%2F94%2F84a4962646c79352d32e2d3c0011%2F210910-stock.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
