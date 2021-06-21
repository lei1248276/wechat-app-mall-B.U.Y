// app.js
import { fetchDisDrawing, fetchGoods } from './api/home';
import { fetchGoodsDetail } from './api/goodsDetail';

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
    updateCb && updateCb(cache.get(key));
  },

  // ! 所有页面的 API 接口方法
  _fetchDisDrawing(updateCb) {
    fetchDisDrawing({
      success: res => this.send('disDrawing', res.data.data.banner.list, updateCb),
      fail: e => console.log(e)
    });
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
      fail: e => console.log(e)
    });
  },
  _fetchGoodsDetail(params, query, updateCb) {
    const value = this.globalData.cache.get(`goodsDetail${query}`);
    if (value) {
      this.send(`goodsDetail${query}`, value, updateCb);
    } else {
      console.log(`cache`);
      fetchGoodsDetail({
        params,
        success: res => this.send(`goodsDetail${query}`, res.data.result, updateCb),
        fail: e => console.log(e)
      });
    }
  }
});
