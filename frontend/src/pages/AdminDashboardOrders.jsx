import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminOrders from "../components/Admin/AdminOrders.jsx";
const AdminDashboardOrders = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <AdminOrders />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
