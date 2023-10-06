import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/ConfigStore";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { userState } = useSelector((state: RootState) => state.user);

  return <>{userState._id ? children : <Navigate to={"/login"} />}</>;
};

export default PrivateRoute;
