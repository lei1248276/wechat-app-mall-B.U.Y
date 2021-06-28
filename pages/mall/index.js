const APP = getApp();

Page({
  data: {
    loaded: true,
    mallGoods: {},
    tags: ['服装', '鞋', '包', '配件']
  },
  onLoad: function() {
    this.fetchMallGoods();
  },
  onScrollLower() {
    this.fetchMallGoods();
  },
  fetchMallGoods() {
    this.loadStart();
    const mallGoods = this.data.mallGoods,
      { type, page } = mallGoods.type
        ? mallGoods
        : { type: 'new', page: 0 };

    APP._fetchMallGoods({ type, page: page + 1 }, mallGoods => {
      this.setData({
        loaded: true,
        mallGoods
      });
    });
  },
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/index'
    });
  },
  toCategory() {
    wx.navigateTo({
      url: '/pages/category/index'
    });
  },
  loadStart() {
    this.setData({
      loaded: false
    });
  }
});
