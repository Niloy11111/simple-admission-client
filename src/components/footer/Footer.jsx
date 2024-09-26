import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" flex gap-10 lg:gap-0 lg:flex-row flex-col-reverse py-14 lg:py-20 justify-around text-[#000000] font-Inter">
      <div>
        <div className="flex items-center gap-2 mb-10">
          <h2 className="text-xl font-extrabold font-Inter"> Admission</h2>
        </div>

        <h2 className="font-Inter font-bold mb-6 uppercase">Connect us on</h2>
        <ul className="flex gap-8 text-textColor">
          <a href="https:/facebook.com">
            {" "}
            <FaFacebook className="text-3xl"></FaFacebook>{" "}
          </a>
          <a href="https:/instagram.com">
            {" "}
            <FaInstagramSquare className="text-3xl"></FaInstagramSquare>{" "}
          </a>
          <a href="https:/twitter.com">
            {" "}
            <FaTwitterSquare className="text-3xl"></FaTwitterSquare>{" "}
          </a>
          <a href="https:/linkedin.com">
            {" "}
            <FaLinkedin className="text-3xl"></FaLinkedin>{" "}
          </a>
          <a href="https:/youtube.com">
            {" "}
            <FaYoutube className="text-3xl"></FaYoutube>{" "}
          </a>
        </ul>
      </div>

      <div>
        <h2 className="font-bold mb-3 uppercase">About Admission</h2>
        <ul>
          <li className="">About us</li>
          <li className="">Careers</li>
          <li className="">Contact Us</li>
          <li className="">Privacy Policy</li>
        </ul>
      </div>

      <div>
        <h2 className="font-bold mb-3 uppercase">Popular University</h2>
        <ul>
          <li className="">Harvard University</li>
          <li className="">Massachusetts Inst. of Tech.</li>
          <li className="">Stanford University</li>
          <li className="">University of California, Berkeley</li>
          <li className="">Yale University</li>
          <li className="">Princeton University</li>
        </ul>
      </div>

      <div>
        <h2 className="font-bold mb-3">GET INVOLVED</h2>
        <div>
          <input
            className="outline-none bg-white py-2.5 pl-3 border-[#444] w-full border rounded"
            placeholder="Enter email adress"
            type="email"
            name=""
            id=""
          />

          <button
            className=" hover:bg-textColor border border-[#444]
           bg-texttext-textColor w-full py-2.5 transition-all hover:text-white font-Inter duration-300  rounded mt-3"
          >
            SUBSCRIBE{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
