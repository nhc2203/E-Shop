import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import OrderDetails from "../../components/Shop/OrderDetails.jsx";
import Footer from "../../components/Layout/Footer";

const ShopOrderDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;
