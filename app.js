// app.js
import { randomRange } from './utils/util';
import { fetchDisDrawing, fetchGoods } from './api/home';
import { fetchGoodsDetail, fetchGoodsRecommend } from './api/goodsDetail';
import { fetchPopularGoods } from './api/search';
import { fetchCategory } from './api/category';

App({
  globalData: {
    cache: new Map(),
    purchase: new Map(),
    payItem: {},
    collection: new Map(),
    isRefresh: false
  },
  // * 预获取请求
  fetch(route, params) {
    const cache = this.globalData.cache;
    if (params) {
      cache.set(route, this[route](route, params));
    } else {
      const router = this.filterQuery(route);
      cache.set(route, this[router.route](route, router.query));
    }
  },
  // * 获取请求到的缓存数据，如果没有缓存就重新请求
  take(route, params) {
    if (params) {
      return this[route](route, params);
    } else {
      const router = this.filterQuery(route);
      return this[router.route](route, router.query);
    }
  },
  // * 对route进行过滤看是否有query
  filterQuery(route) {
    const path = route.split('?');
    let query;
    route = path[0];
    path[1] && (query = path[1].split('=').reduce((acc, cur) => ({ [acc]: cur })));
    return { route, query };
  },

  /*  ! 设置需要预请求页面数据的 API 方法  */
  // * home page API
  'pages/home/index': function(route, params = { type: 'sell', page: randomRange(1, 10) }) {
    const cache = this.globalData.cache;
    if (cache.has(route)) return cache.get(route);

    const goods = new Promise((resolve, reject) => {
        fetchGoods({
          params,
          success: res => resolve(res.data.data),
          fail: err => reject(err)
        });
      }),
      disDrawing = new Promise((resolve, reject) => {
        fetchDisDrawing({
          success: res => resolve(res.data.data.banner.list),
          fail: err => reject(err)
        });
      });
    return Promise.all([goods, disDrawing]);
  },
  // * goodsDetail page API
  'pages/goodsDetail/index': function(route, params) {
    const cache = this.globalData.cache;
    if (cache.has(route)) return cache.get(route);

    const goodsDetail = new Promise((resolve, reject) => {
        fetchGoodsDetail({
          params,
          success: res => resolve(res.data.result),
          fail: err => reject(err)
        });
      }),
      goodsRecommend = new Promise((resolve, reject) => {
        fetchGoodsRecommend({
          success: res => resolve(res.data.data.list),
          fail: err => reject(err)
        });
      });
    return Promise.all([goodsDetail, goodsRecommend]);
  },
  // * search page API
  'pages/search/index': function(route, params = { type: 'pop', page: randomRange(1, 20) }) {
    const cache = this.globalData.cache;
    if (cache.has(route)) return cache.get(route);

    return new Promise((resolve, reject) => {
      fetchPopularGoods({
        params,
        success: res => resolve(res.data.data.list),
        fail: err => reject(err)
      });
    });
  },
  // * category page API
  'pages/mall/page/category/index': function(route) {
    const cache = this.globalData.cache;
    if (cache.has(route)) return cache.get(route);

    return new Promise((resolve, reject) => {
      fetchCategory({
        success: res => resolve(res.data.data.category.list),
        fail: err => reject(err)
      });
    });
  }
  /* // * mall page API
  'pages/mall/index': function(route, params) {
    const cache = this.globalData.cache;
    if (cache.has(route)) {
      const value = cache.get(route);
      cache.delete(route);
      return value;
    }
    return new Promise(((resolve, reject) => {

    }))
  }*/
});
