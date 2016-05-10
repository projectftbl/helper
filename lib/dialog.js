import Promise from 'bluebird';
import url from 'url';

const TITLE = 'dialog'
    , WIDTH = 580
    , HEIGHT = 470;

export default (uri, options = {}) => {
  return new Promise((resolve, reject) => {

    const w = options.width || WIDTH
        , h = options.height || HEIGHT;
        
    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
        , height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const left = (width - w) / 2
        , top = (height - h) / 2;

    const dialog = window.open(uri, options.title || TITLE, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    if (window.focus && dialog && !dialog.closed) {
      dialog.focus();
    }

    if (dialog) {
      var interval = window.setInterval(function() {
        if (dialog.closed) {
          window.clearInterval(interval);
        }
      }, 1000);
    }

    const listener = window.addEventListener('message', function(e) {
      window.removeEventListener('message', listener);

      if (url.parse(e.origin).host === window.location.host) {
        const data = JSON.parse(e.data);

        if (data.error) return reject(data.error);

        return resolve(data);
      } else {
        return reject();
      }

    }, false);
  });
};

