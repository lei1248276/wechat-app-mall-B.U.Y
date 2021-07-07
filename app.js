// app.js
import { fetchDisDrawing, fetchGoods } from './api/home';
import { fetchGoodsDetail, fetchGoodsRecommend } from './api/goodsDetail';
import { fetchPopularGoods } from './api/search';
import { fetchCategory } from './api/category';

App({
  globalData: {
    cache: new Map(),
    purchase: new Map(),
    payItem: {},
    isRefresh: false
  },
  // * 预获取请求
  fetch(route, params) {
    const cache = this.globalData.cache;
    ({ route, params } = this.filter(route, params));
    cache.set(route, this[route](route, params));
  },
  // * 获取请求到的缓存数据，如果没有缓存就重新请求
  take(route, params) {
    ({ route, params } = this.filter(route, params));
    return this[route](route, params);
  },
  filter(route, params) {
    const path = route.split('?');
    route = path[0];
    path[1] && (params = path[1].split('=').reduce((acc, cur) => ({ [acc]: cur })));
    return { route, params };
  },

  /*  ! 设置需要预请求页面数据的 API 方法  */
  // * home page API
  'pages/home/index': function(route, params = { type: 'sell', page: 1 }) {
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
    if (cache.has(route)) {
      const value = cache.get(route);
      cache.delete(route);
      return value;
    }
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
  'pages/search/index': function(route, params = { type: 'pop', page: 1 }) {
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
