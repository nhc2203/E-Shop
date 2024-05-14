import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader.jsx";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar.jsx";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain.jsx";
const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={1} />
        </div>
        <div className="w-full justify-center flex">
          <AdminDashboardMain />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
