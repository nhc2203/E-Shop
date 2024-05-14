import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminAllUsers from "../components/Admin/AdminAllUsers.jsx";
const AdminDashboardUsers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <AdminAllUsers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
