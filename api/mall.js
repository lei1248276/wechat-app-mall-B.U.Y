import request from '../utils/request';

// ! 请求商城商品数据
export function fetchMallGoods(options) {
  const op = Object.assign({
    url: '/home/data',
    method: 'get',
    params: {
      type: options.params.type,
      page: options.params.page
    }
  }, options);
  return request(op);
}
