import request from '../utils/request';

// ! 获取商品详情页信息
export function fetchGoodsDetail(options) {
  const op = Object.assign({
    url: '/detail',
    method: 'get'
  }, options);
  return request(op);
}

// ! 获取推荐商品
export function fetchGoodsRecommend(options) {
  const op = Object.assign({
    url: '/recommend',
    method: 'get'
  }, options);
  return request(op);
}
