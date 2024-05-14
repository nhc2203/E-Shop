import React from "react";
import styles from "../../../styles/styles";
import Countdown from "./Countdown";
import { backend_url } from "../../../server";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  console.log(data);
  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already exists");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully");
      }
    }
  };
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:-w[40%] m-auto">
        <img src={`${data?.images[0]?.url}`} alt="" />
      </div>
      <div className="w-full lg:w-[60%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p className="whitespace-pre-line">{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out ? data.sold_out : 0} Sold
          </span>
        </div>
        <Countdown data={data} />
        <br />
        <div className="flex items-center justify-between">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff]`}
            onClick={() => addToCartHandler(data._id)}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
