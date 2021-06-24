const APP = getApp();

Page({
  data: {
    loaded: false,
    photo: '',
    goods: [],
    disDrawing: ''
  },
  onLoad: function() {
    APP._fetchDisDrawing((disDrawing, cache) => {
      const goods = cache.get('goods'),
        list = goods[0].list,
        photo = list.splice(0, 1)[0];

      this.setData({
        photo,
        goods,
        disDrawing
      });
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
    const goods = this.data.goods,
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
