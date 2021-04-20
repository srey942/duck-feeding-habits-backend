let apiValidation = require("../services/apiValidation.sevice");
let duckFeedHabitsService = require("../services/db.service");

exports.addFoodDetails = async (req, res) => {
  console.log("request from frontend", req.body);
  let fn = await apiValidation.validateForm(req.body);
  console.log("await", fn);
  if (fn) {
    console.log("await fn return", fn);
    await duckFeedHabitsService.dbStore(req.body);

    res.json({
      success: true,
      message: "API Field Validation Sucesss",
    });
  } else {
    console.log("response from controller else ");
    res.json({
      success: false,
      message: "Error API Field Validation",
    });
  }
};

exports.getFoodDetails = async (req, res) => {
  const getData = await duckFeedHabitsService.dbGet();
  console.log("data from ", getData);
  return res.json(getData);
  // console.log("mongodb", );
};
