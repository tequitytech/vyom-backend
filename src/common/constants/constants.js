module.exports = {
  PASSWORD: {
    SALT: 10,
  },

  JWT: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

    ACCESS_TOKEN_EXPIRES_IN: "365 days",
    REFRESH_TOKEN_EXPIRES_IN: "7 days",
  },
};
