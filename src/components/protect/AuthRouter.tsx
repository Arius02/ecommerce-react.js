import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const AuthRouter = ({ allowedRoles, children }: Props) => {
  const { auth } = useContext(AppContext);
  console.log(auth);
  const location = useLocation();
  return allowedRoles.includes(auth?.role || "") ? (
    children
  ) : auth?._id ? (
    <Navigate to="/auth/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default AuthRouter;
