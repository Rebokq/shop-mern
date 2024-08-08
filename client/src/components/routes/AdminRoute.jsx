
import React, { useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import { currentAdmin } from "../../functions/auth";
import CategoryCreate from "../../pages/admin/category/CategoryCreate";
import CategoryUpdate from "../../pages/admin/category/CategoryUpdate";
import SubCreate from "../../pages/admin/sub/SubCreate";
import SubUpdate from "../../pages/admin/sub/SubUpdate";
import ProductCreate from "../../pages/admin/product/ProductCreate";

const AdminRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    console.log('current admin response', res)
                    setOk(true)
                })
                .catch((err) => {
                    console.log('admin route error', err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? (
        <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="category" element={<CategoryCreate />} />
            <Route path="category/:slug" element={<CategoryUpdate />} />
            <Route path="sub" element={<SubCreate />} />
            <Route path="sub/:slug" element={<SubUpdate />} />
            <Route path="product" element={<ProductCreate />} />


        </Routes>
    ) : (
        <LoadingToRedirect />
    );
};
export default AdminRoute;


