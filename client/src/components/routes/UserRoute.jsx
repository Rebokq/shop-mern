
import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import UserHistory from "../../pages/user/History"
import UserProfile from "../../pages/user/Profile"
const UserRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
   
    return user && user.token ? (
      <Routes>
        <Route path="history" element={<UserHistory />} />
        <Route path="profile" element={<UserProfile />} />

      </Routes>
    ) : (
      <LoadingToRedirect />
    );
  };
  export default UserRoute;


