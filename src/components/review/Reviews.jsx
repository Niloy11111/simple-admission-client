import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import UseReviews from "../../hooks/UseReviews";
const Reviews = () => {
  const [reviews] = UseReviews();
  return (
    <div>
      <h2 className="headTitle mt-20 ">Reviews from Students</h2>

      <div className="-mt-10">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((item) => (
            <SwiperSlide className=" text-white " key={item._id}>
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
