import React, { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  console.log(isSeller);
  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isSeller, navigate]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
