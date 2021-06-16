const globalData = getApp().globalData;

Page({
  data: {
    disDrawing: [],
    goods: []
  },
  onLoad: function(options) {
    this.setData({
      disDrawing: globalData.disDrawing,
      goods: globalData.goods
    });
    console.log(this.data.disDrawing);
    console.log(this.data.goods);
  }
});
