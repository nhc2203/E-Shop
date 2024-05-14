import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminAllSellers from "../components/Admin/AdminAllSellers.jsx";
const AdminDashboardSellers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <AdminAllSellers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSellers;
