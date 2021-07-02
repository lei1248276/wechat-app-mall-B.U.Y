const APP = getApp();

Page({
  onLoad() {
    APP.fetch('pages/home/index');
  },
  toHome() {
    wx.switchTab({ url: '/pages/home/index' });
  }
});
