let duckFeedHabitsService = require('../services/db.service');

exports.addFoodDetails = async (req, res) => {
  console.log('request from frontend', req.body);
  let fn = await cmsSchema.validateForm(req.body);
  console.log('await', fn);
  if (!fn) {
    res.status(400).json({
      success: false,
      message: 'Error API Field Validation',
    });
  }
  console.log('await fn return', fn);
  try {
    await duckFeedHabitsService.dbStore(req.body);
    res.status(201).json({
      success: true,
      message: 'API Field Validation Sucesss',
    });
  } catch (error) {
    return res.status(500);
  }
};

exports.getFoodDetails = async (req, res) => {
  try {
    const getData = await duckFeedHabitsService.dbGet();
    console.log('data from ', getData);
    return res.json(getData);
  } catch (error) {
    return res.status(500);
  }
};

exports.getFormFields = async (req, res) => {
  return res.json(cmsSchema.contentEntries);
};
