import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishList }) => {
  const { wishlist } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const cartData = { ...data, qty: 1 };
    dispatch(addToCart(cartData));
    setOpenWishList(false);
  };
  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <h5>Wishlist Items is Empty</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishList(false)}
                />
              </div>
              {/* Item Length */}
              <div className={`800px:${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} items
                </h5>
              </div>
              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromWishlistHandler(data)}
        />
        <img
          src={`${data.images[0].url}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>
            {data.name.length > 50 ? data.name.slice(0, 50) + "..." : data.name}
          </h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px]  text-[#d02222] font-Roboto">
            ${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
