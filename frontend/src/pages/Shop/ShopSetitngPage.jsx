import React from "react";
import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar.jsx";

const ShopSetitngPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <div className="w-full justify-center flex">
          <ShopSettings />
        </div>
      </div>
    </div>
  );
};

export default ShopSetitngPage;
