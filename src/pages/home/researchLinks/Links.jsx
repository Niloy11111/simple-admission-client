import React from "react";
import { Link } from "react-router-dom";

const Links = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mt-20 mb-10">
        Some Research Papers we reccomend
      </h1>
      <div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2">
          <Link
            className="buttonOrange py-5 text-center"
            to={`https://www.thurj.org/f23-swang`}
          >
            Economic Assimilation of Asian American Immigrants by Nationality
          </Link>
          <Link
            className="buttonOrange py-5 text-center"
            to={`https://www.thurj.org/f23-egao`}
          >
            Qualitative Histopathological Analysis of Bleomycin-Induced Lung
            Injury
          </Link>
          <Link
            className="buttonOrange py-5 text-center"
            to={`https://www.thurj.org/f23-amsosa`}
          >
            Are We Alone? One Question, One Scientist, Two Harvard Initiatives
          </Link>
          <Link
            className="buttonOrange py-5 text-center"
            to={`https://www.thurj.org/f23-ttobel`}
          >
            The Sins of Memory in the Digital Age: An Interview with Professor
            Daniel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Links;
