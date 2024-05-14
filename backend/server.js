const app = require("./app");
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary");

//handling uncaught exceptions

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server for handling uncaught exceptions");
});
//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// //Connect to database
connectDatabase();

cloudinary.config({
  cloud_name: "dq9fbzke2",
  api_key: "172798419478283",
  api_secret: "XxC9ZLwCFKrWByMeVfM71nsCeFI",
});
//create server

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("uncaughtException", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
