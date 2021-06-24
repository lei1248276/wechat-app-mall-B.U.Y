// app.js
import { fetchDisDrawing, fetchGoods } from './api/home';
import { fetchGoodsDetail, fetchGoodsRecommend } from './api/goodsDetail';

App({
  globalData: {
    cache: new Map()
  },
  onLaunch() {
    this._fetchDisDrawing();
    this._fetchGoods({ type: 'sell', page: 1 });
  },
  // ! 统一设置缓存数据和更新回调
  send(key, value, updateCb) {
    const { cache } = this.globalData;
    cache.set(key, value);
    updateCb && updateCb(cache.get(key), cache);
  },

  // ! 所有页面的 API 接口方法
  _fetchDisDrawing(updateCb) {
    const value = this.globalData.cache.get(`disDrawing`);
    if (value) {
      this.send(`disDrawing`, value, updateCb);
      console.log(`cache`);
    } else {
      fetchDisDrawing({
        success: res => this.send('disDrawing', res.data.data.banner.list, updateCb),
        fail: err => console.log(err)
      });
    }
  },
  _fetchGoods(params, updateCb) {
    fetchGoods({
      params,
      success: res => {
        const goods = this.globalData.cache.get('goods') || [],
          data = res.data.data,
          item = {
            drawing: data.list[0],
            list: data.list.slice(1, data.list.length),
            type: data.sort,
            page: data.page
          };
        goods.push(item);
        this.send('goods', goods, updateCb);
      },
      fail: err => console.log(err)
    });
  },
  _fetchGoodsDetail(params, query, updateCb) {
    const value = this.globalData.cache.get(`goodsDetail${query}`);
    if (value) {
      this.send(`goodsDetail${query}`, value, updateCb);
      console.log(`cache`);
    } else {
      fetchGoodsDetail({
        params,
        success: res => this.send(`goodsDetail${query}`, res.data.result, updateCb),
        fail: err => console.log(err)
      });
    }
  },
  _fetchGoodsRecommend(updateCb) {
    const value = this.globalData.cache.get(`goodsRecommend`);
    if (value) {
      this.send(`goodsRecommend`, value, updateCb);
      console.log(`cache`);
    } else {
      fetchGoodsRecommend({
        success: res => this.send('goodsRecommend', res.data.data.list, updateCb),
        fail: err => console.log(err)
      });
    }
  }
});
