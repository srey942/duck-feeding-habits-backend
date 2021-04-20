const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const apiValidation = require("./app/services/apiValidation.sevice")
const port = 3000;


(async () => {
  app.use(bodyParser.json());

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  app.use(cors());
  await apiValidation.getSchema();
  //db
  const dbConfig = require("./database.config");
  const mongoose = require("mongoose");
  
  mongoose.Promise = global.Promise;
  console.log("Mongo DB Connection Check");
  // // Connecting to the database
  mongoose
    .connect(dbConfig.url, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log("Could not connect to the database. Exiting now...", err);
      process.exit();
    });
  
  require("./app/routes/routes.js")(app);
  
  app.listen(port, "0.0.0.0", () =>
    console.log(`Duck Feeding app listening on port ${port}!`)
  );

  

})();

