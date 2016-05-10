const config = JSON.parse(atob(window.config));

export default function(key) {
  return config[key.toUpperCase()];
};