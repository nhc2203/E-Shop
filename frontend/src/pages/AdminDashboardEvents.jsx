import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminEvents from "../components/Admin/AdminEvents";

const AdminDashboardEvents = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <AdminEvents />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEvents;
