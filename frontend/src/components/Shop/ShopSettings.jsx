import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);

  const dispatch = useDispatch();
  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", file);
    await axios
      .put(`${server}/shop/update-shop-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then(
        (res) => toast.success("Your avatar has been updated"),
        dispatch(loadSeller())
      )
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center ">
          <div className="relative">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_url}/${seller.avatar}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[10px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
        {/* Shop Info */}
        <form
          aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Description</label>
            </div>
            <input
              type="name"
              placeholder={`${
                description ? description : "Enter your description"
              }`}
              value={description ? description : null}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="address"
              placeholder={`${address ? address : "Enter your address"}`}
              value={address ? address : null}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={`${
                phoneNumber ? phoneNumber : "Enter your phoneNumber"
              }`}
              value={phoneNumber ? phoneNumber : null}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop ZipCode</label>
            </div>
            <input
              type="number"
              placeholder={`${zipCode ? zipCode : "Enter your zipCode"}`}
              value={zipCode ? zipCode : null}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="Submit"
              value="Update Shop"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 cursor-pointer`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
