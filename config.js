// config.js
const dotenv = require("dotenv");

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

module.exports = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
