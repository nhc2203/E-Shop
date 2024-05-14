import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminWithdraw from "../components/Admin/AdminWithdraw";
const AdminDashboardWithdraw = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={7} />
          </div>
          <AdminWithdraw />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
