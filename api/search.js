import request from '../utils/request';

export function fetchPopularGoods(options) {
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
