import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import UseReviews from "../../hooks/UseReviews";
const Reviews = () => {
  const [reviews] = UseReviews();

  return (
    <div>
      <h2 className="text-3xl  text-center lg:text-4xl  font-extrabold uppercase mt-8 lg:mt-10 mb-8  lg:mb-16 ">
        Reviews from Students
      </h2>

      <div className="">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((item) => (
            <SwiperSlide
              className="text-sm md:text-base text-white "
              key={item._id}
            >
              <div className="bg-white lg:w-9/12 h-[40vh] lg:h-[20vh] mx-auto rounded-xl flex justify-center items-center">
                <p className="mx-10 text-black"> {item.review}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
