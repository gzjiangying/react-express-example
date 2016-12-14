import 'whatwg-fetch';

export default async function(url, opts) {
  try {
    console.log(url);
    if (!opts.headers) {
      opts.headers = {};
    }
    opts.credentials = 'same-origin';
    if (opts.body) {
      opts.headers['Content-Type'] = 'application/json';
    }
    let res = await fetch(url, opts);
    let json = null;

    if (res.status >= 200 && res.status < 300) {
      json = await res.json();
      //console.log(json);
      return json;
    } else if (res.status >= 400 && res.status < 500) {
      json = await res.json();

      for (let [key, value] of res.json) {
        Messenger().post({
          message: `${key}: ${value}`,
          type: 'error',
          showCloseButton: true
        });
      }
    } else if (res.status >= 500 && res.status < 600) {
      json = await res.json();
      Messenger().post({
        message: json.message,
        type: 'error',
        showCloseButton: true
      });
    } else {
      throw 'unkown error'
    }
  } catch (err) {
    Messenger().post({
      message: err.message,
      type: 'error',
      showCloseButton: true
    });
  }

  return null;
}