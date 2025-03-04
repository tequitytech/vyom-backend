module.exports = {
  baseUrl(path = null) {
    let url = `http://${process.env.HOST}:${process.env.PORT}`;

    return url + (path ? `/${path}` : "");
  },

  apiBaseUrl(path = null) {
    let url = `http://${process.env.HOST}:${process.env.PORT}/api/v1`;

    return url + (path ? `/${path}` : "");
  },
};
