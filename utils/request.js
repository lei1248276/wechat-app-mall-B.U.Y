export const baseURL = 'http://152.136.185.210:8000/api/w6';

/* function request(options) {
  return new Promise((resolve, reject) => {
    const api = wx.request({
      url: baseURL + options.url,
      method: options.method,
      data: options.parmas || {},
      success: resolve,
      fail: reject,
      timeout: 5000
    });
    console.log(api);
    return api;
  });
}*/
function request(options) {
  const op = Object.assign(options, {
    url: baseURL + options.url,
    method: options.method,
    data: options.params || {},
    success: options.success,
    fail: options.fail,
    timeout: 5000
  });
  return wx.request(op);
}

export default request;
