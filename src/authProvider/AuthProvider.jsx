import { createContext, useEffect, useState } from "react";

import axios from "axios";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/UseAxiosPublic";
import useUsers from "../hooks/UseUsers";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const googleprovider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [collegeData, setCollegeData] = useState([]);
  const [searchCollege, setSearchCollege] = useState("");
  const [updatedCollege, setUpdatedCollege] = useState({});
  const [users, , refetch] = useUsers();
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleprovider);
  };

  const githubSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const facebookSignIn = () => {
    // setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);

      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [axiosPublic, refetch, users]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      axios
        .get(
          `http://localhost:5000/users/email/${
            user?.email
              ? user?.email
              : firebaseUser?.email
              ? firebaseUser?.email
              : "hello@hello.com"
          }`
        )
        .then((data) => setUser(data?.data));
    }
  }, [user?.email, firebaseUser?.email]);

  const AuthInfo = {
    user,
    loading,
    googleSignIn,
    firebaseUser,
    facebookSignIn,
    githubSignIn,
    setSearchCollege,
    searchCollege,
    setCollegeData,
    collegeData,
    setUpdatedCollege,
    updatedCollege,
    setUser,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
