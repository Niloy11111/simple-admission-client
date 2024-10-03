import { Navigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

const PrivateRoute = ({ children }) => {
  const { user, firebaseUser } = UseAuth();

  if (user || firebaseUser) {
    return children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};

export default PrivateRoute;
