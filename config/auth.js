require("dotenv").config();

const auth_config = {
  auth0: {
    authRequired: false,
    auth0Logout: true,
    secret: "a long, randomly-generated string stored in env",
    baseURL: "http://localhost:3000",
    clientID: "3RKs1NNVQjQ6dOCH64dIFlkQ9zr5Ek1s",
    issuerBaseURL: "https://dev-njvq23xe.auth0.com",
  },
};

module.exports = auth_config;
