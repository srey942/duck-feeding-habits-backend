const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const CMSSchema = require('./app/services/cmsSchema.sevice');
const { port } = require('./config');
global.cmsSchema = new CMSSchema();

const start = async () => {
  app.use(bodyParser.json());

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // update to match the domain you will make the request from
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });

  app.use(cors());
  await cmsSchema.init();

  //db
  const dbConfig = require('./database.config');
  const mongoose = require('mongoose');

  mongoose.Promise = global.Promise;
  console.log('Mongo DB Connection Check');
  // Connecting to the database
  try {
    await mongoose.connect(dbConfig.url, {
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  }

  require('./app/routes/routes.js')(app);

  app.listen(process.env.PORT || port, '0.0.0.0', () => {
    console.log(`Duck Feeding app listening on port ${port}!`);
    app.emit('appStarted');
  });
};

(async () => {
  await start();
})();

module.exports = app;
