var config = JSON.parse(atob(window.config));

module.exports = function(key) {
  return config[key.toUpperCase()];
};