const Research = ({ research }) => {
  const { title, researchImage, description, benefitOfResearch } = research;
  return (
    <div className=" ">
      <img className="rounded-xl w-[600px] h-full" src={researchImage} alt="" />
      <div className="">
        <p className="text-xl my-4 font-semibold">{title}</p>
        <p className="">{description}</p>
      </div>
      <p className="  "> {benefitOfResearch}</p>
    </div>
  );
};

export default Research;
