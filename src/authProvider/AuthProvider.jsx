import { createContext, useEffect, useState } from "react";

import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const googleprovider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [mycollege, setMyCollege] = useState([]);
  const [collegeData, setCollegeData] = useState([]);
  const [searchCollege, setSearchCollege] = useState("");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleUpdateProfile = (name, photo) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/candidateInfoEmail?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => setMyCollege(data));
    }
  }, [user?.email, user]);

  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  console.log(searchCollege);

  const AuthInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOut,
    googleSignIn,
    handleUpdateProfile,
    mycollege,
    updateUserProfile,
    resetPass,
    facebookSignIn,
    githubSignIn,
    setSearchCollege,
    searchCollege,
    setCollegeData,
    collegeData,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
