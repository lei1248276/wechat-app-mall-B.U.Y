import request from '../utils/request';

// ! 请求展展示图示图片
export function getDisDrawing(options) {
  const op = Object.assign({
    url: '/home/multidata',
    method: 'get'
  }, options);
  return request(op);
}

// ! 请求商品数据
export function getGoods(options) {
  const op = Object.assign({
    url: '/home/data',
    method: 'get'
  }, options);
  return request(op);
}
