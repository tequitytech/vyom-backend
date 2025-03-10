module.exports = {
  baseUrl(path = null) {
    let url = `http://${process.env.HOST}:${process.env.PORT}`;

    return url + (path ? `/${path}` : "");
  },

  apiBaseUrl(path = null) {
    if (process.env.USE_SERVER_MANAGED_SSL === "true") {
      let url = `${process.env.BASE_URL}/api/v1`;
      return url + (path ? `/${path}` : "");
    }

    let url = `http://${process.env.HOST}:${process.env.PORT}/api/v1`;
    return url + (path ? `/${path}` : "");
  },
};
