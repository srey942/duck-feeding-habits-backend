module.exports = (app) => {
  let formHandler = require('../controller/form.controller');

  app.get('/getFormFields', formHandler.getFormFields);

  app.get('/getFoodDetails', formHandler.getFoodDetails);

  app.post('/addFoodDetails', formHandler.addFoodDetails);
};
