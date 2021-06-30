import request from '../utils/request';

// ! category页面中的分类数据
export function fetchCategory(options) {
  const op = Object.assign({
    url: '/category',
    method: 'get'
  }, options);
  return request(op);
}

/* 分类页面的menu-content*/
export function fetchSubCategory(options) {
  const op = Object.assign({
    url: '/subcategory',
    method: 'get',
    params: {
      maitKey: options.params.maitKey
    }
  }, options);
  return request(op);
}

/* 分类页面的商品信息*/
export function fetchSubCategoryGoods(options) {
  const op = Object.assign({
    url: '/subcategory/detail',
    method: 'get',
    params: {
      miniWallkey: options.params.miniWallkey,
      type: options.params.type
    }
  }, options);
  return request(op);
}
