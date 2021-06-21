const APP = getApp(),
  cache = APP.globalData.cache;

Page({
  data: {
    loaded: false,
    photo: '',
    goods: [],
    disDrawing: ''
  },
  onLoad: function() {
    const disDrawing = cache.get('disDrawing'),
      goods = cache.get('goods'),
      list = goods[0].list,
      photo = list.splice(0, 1)[0];

    this.setData({
      photo,
      goods,
      disDrawing
    });
  },
  onReady() {
    this.fetchGoods();
  },
  onReachBottom() {
    this.fetchGoods();
  },
  fetchGoods() {
    this.loadStart();
    const goods = cache.get('goods'),
      { type, page } = goods[goods.length - 1];

    APP._fetchGoods({ type, page: page + 1 }, goods => {
      this.setData({ goods, loaded: false });
    });
  },
  loadStart() {
    this.setData({
      loaded: true
    });
  }
});
