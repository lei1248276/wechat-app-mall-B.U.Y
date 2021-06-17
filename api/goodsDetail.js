import request from '../utils/request';

// ! 获取商品详情页信息
export function getGoodsDetail(options) {
  const op = Object.assign({
    url: '/detail',
    method: 'get'
  }, options);
  return request(op);
}
