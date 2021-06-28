import request from '../utils/request';

// ! category页面中的分类数据
export function fetchCategory(options) {
  const op = Object.assign({
    url: '/category',
    method: 'get'
  }, options);
  return request(op);
}

/* 分类页面的menu-content网络请求*/
export function getSubCategory(maitKey) {
  return request({
    url: '/subcategory',
    data: {
      maitKey
    }
  });
}

/* 分类页面的商品信息网络请求*/
export function getCategoryGoods(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  });
}
