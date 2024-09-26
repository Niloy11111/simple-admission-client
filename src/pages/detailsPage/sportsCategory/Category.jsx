const Category = ({ category }) => {
  const { sportsName, sportsImage, description } = category;
  return (
    <div className=" ">
      <img className="rounded-xl w-[600px] h-full" src={sportsImage} alt="" />
      <div className="">
        <p className="text-xl my-4 font-semibold">{sportsName}</p>
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default Category;
