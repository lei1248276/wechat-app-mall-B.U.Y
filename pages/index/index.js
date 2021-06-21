Page({
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
