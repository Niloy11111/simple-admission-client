import { Helmet } from "react-helmet";
import Footer from "../../components/footer/Footer";
import Reviews from "../../components/review/Reviews";
import Banner from "./banner/Banner";
import Cards from "./cards/Cards";
import Graduates from "./graduates/Graduates";
import Links from "./researchLinks/Links";

const HomePage = () => {
  return (
    <div className="">
      <Helmet>
        <title>Home | ToKnow </title>
      </Helmet>
      <Banner />
      <Cards />
      <Graduates />
      <Links />

      <Reviews />

      <Footer />
    </div>
  );
};

export default HomePage;
