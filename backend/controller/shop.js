const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const sendShopToken = require("../utils/shopToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");

//create shop
router.post(
  "/create-shop",
  // upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;
      const sellerEmail = await Shop.findOne({ email });

      if (sellerEmail) {
        // const filename = req.file.filename;
        // const filePath = `uploads/${filename}`;
        // fs.unlink(filePath, (err) => {
        //   if (err) {
        //     console.log(err);
        //     res.status(500).json({ message: "Error deleting file" });
        //   }
        // });
        return next(new ErrorHandler("Shop already exists", 400));
      }
      // const filename = req.file.filename;
      // const fileUrl = path.join(filename);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
      });

      const seller = {
        name: req.body.name,
        email: email,
        password: req.body.password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
      };

      const activationToken = createActivationToken(seller);
      const activationUrl = `https://e-shop-seven-nu.vercel.app/seller/activation/${activationToken}`;
      try {
        await sendMail({
          email: seller.email,
          subject: "Account Activation",
          message: `Hi ${seller.name}, Please click on the link below to activate your shop: ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `Please check your email:- ${seller.email} to activate your shop`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//create activation token

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate shop
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let shop = await Shop.findOne({ email });

      if (shop) {
        return next(new ErrorHandler("Shop already exists", 400));
      }

      shop = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });
      sendShopToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//Login

router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
      }

      const user = await Shop.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler(`User doesn't exist`, 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide invalid information", 400)
        );
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//Load user

router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller.id);
      if (!seller) {
        return next(new ErrorHandler(`Seller doesn't exist`, 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Log out from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(201).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Update shop avatar
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existUser = await Shop.findById(req.seller._id);
      const existAvatarPath = `uploads/${existUser.avatar}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const user = await Shop.findByIdAndUpdate(req.seller._id, {
        avatar: fileUrl,
      });
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//Update shop info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//All seller ----for admin
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({ createdAt: -1 });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller withdraw methods --- sellers
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller withdraw merthods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this id", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
