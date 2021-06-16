const computed = require('miniprogram-computed').behavior;
const globalData = getApp().globalData;

Page({
  behaviors: [computed],
  data: {
    disDrawing: [],
    goods: []
  },
  onLoad: function(options) {
    this.setData({
      disDrawing: globalData.disDrawing,
      goods: globalData.goods
    });
  },
  computed: {
    getGoods_1(data) {
      return data.goods.slice(2, 31);
    }
  }
});
