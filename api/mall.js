import request from '../utils/request';

// ! 请求商城商品数据
export function fetchMallGoods(options) {
  const op = Object.assign({
    url: '/home/data',
    method: 'get'
  }, options);
  return request(op);
}
