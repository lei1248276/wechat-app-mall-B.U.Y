import { getDisDrawing, getGoods } from '../../api/home';

const globalData = getApp().globalData;

Page({
  data: {
  },

  onLoad() {
    getDisDrawing({
      success(res) {
        globalData.disDrawing = res.data.data.banner.list;
      },
      fail(e) {
        console.log(e);
      }
    });
    getGoods({
      params: { type: 'sell', page: 1 },
      success(res) {
        globalData.goods = res.data.data;
      },
      fail(e) {
        console.log(e);
      }
    });
  },

  toHome() {
    wx.switchTab({
      url: '/pages/home/index'
      /* success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
      }*/
    });
  }
});
