const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  spaceId: process.env.spaceId,
  token: process.env.accessToken,
  port: process.env.PORT,
  url: process.env.url,
  secret: process.env.secret,
};
