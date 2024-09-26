const Event = ({ event }) => {
  const { name, date, eventImage, description } = event;
  return (
    <div className=" ">
      <img className="rounded-xl w-[400px] h-[300px]" src={eventImage} alt="" />
      <div className="">
        <p className="text-xl my-4 font-semibold">{name}</p>
        <p className="max-w-[400px]">{description?.slice(35)}</p>
      </div>
      <p className=" text-center buttonOrange"> {date}</p>
    </div>
  );
};

export default Event;
