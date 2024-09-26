import { createBrowserRouter } from "react-router-dom";
import Admission from "../pages/admission/Admission";
import AllColleges from "../pages/allColleges/AllColleges";
import CollegeDetails from "../pages/detailsPage/CollegeDetails";
import Errorpage from "../pages/errorpage/Errorpage";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/login/Login";
import MyCollege from "../pages/myCollege/MyCollege";
import Profile from "../pages/profile/Profile";
import Root from "../root/Root";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/details/:id",
        loader: ({ params }) =>
          fetch(
            `https://simple-admission-server.vercel.app/allColleges/${params.id} `
          ),
        element: (
          <PrivateRoute>
            <CollegeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/allColleges",

        element: <AllColleges />,
      },
      {
        path: "/admission",
        element: <Admission />,
      },
      {
        path: "/myCollege",

        element: (
          <PrivateRoute>
            <MyCollege />
          </PrivateRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      //   {
      //     path: "/appliedJobs",
      //     element: (
      //       <PrivateRoute>
      //         {" "}
      //         <AppliedJob></AppliedJob>
      //       </PrivateRoute>
      //     ),
      //   },
    ],
  },
]);
