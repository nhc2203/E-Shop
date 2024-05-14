import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminProducts from "../components/Admin/AdminProducts.jsx";
const AdminDashboardProducts = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <AdminProducts />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProducts;
