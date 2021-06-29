// app.js
import { fetchDisDrawing, fetchGoods } from './api/home';
import { fetchGoodsDetail, fetchGoodsRecommend } from './api/goodsDetail';
import { fetchPopularGoods } from './api/search';
import { fetchCategory } from './api/category';

App({
  globalData: {
    cache: new Map()
  },
  onLaunch() {
    this.fetch({ route: 'pages/home/index', params: { type: 'sell', page: 1 }});
  },
  // * 预获取请求
  fetch({ route, params }) {
    const cache = this.globalData.cache;
    cache.set(route, this[route](route, params));
  },
  // * 获取请求到的缓存数据
  take(route) {
    const cache = this.globalData.cache;
    if (cache.has(route)) return cache.get(route);
    return null;
  },

  /*  ! 设置需要预请求页面数据的 API 方法  */
  // * home page API
  'pages/home/index': function(route, params) {
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
  'pages/search/index': function(route, params) {
    const data = this.take(route);
    if (data) return data;

    return new Promise((resolve, reject) => {
      fetchPopularGoods({
        params,
        success: res => resolve(res.data.data.list),
        fail: err => reject(err)
      });
    });
  },
  // * category page API
  'pages/category/index': function(route) {
    const data = this.take(route);
    if (data) return data;

    return new Promise((resolve, reject) => {
      fetchCategory({
        success: res => resolve(res.data.data.category.list),
        fail: err => reject(err)
      });
    });
  }
});
