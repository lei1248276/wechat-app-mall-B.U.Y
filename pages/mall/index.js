import { fetchMallGoods } from '../../api/mall';
const APP = getApp();

Page({
  data: {
    loaded: true,
    mallGoods: { type: 'new', page: 0 },
    tags: ['服装', '鞋', '包', '配件']
  },
  onLoad: function() {
    this._fetchMallGoods();
  },
  onScrollLower() {
    this._fetchMallGoods();
  },
  _fetchMallGoods() {
    this.loadStart();
    const mallGoods = this.data.mallGoods,
      { type, page } = mallGoods;

    fetchMallGoods({
      params: { type, page: page + 1 },
      success: res => {
        const data = res.data.data,
          item = {
            list: mallGoods.list ? mallGoods.list.concat(data.list) : data.list,
            type: data.sort,
            page: data.page,
            total: data.total
          };
        this.setData({ loaded: true, mallGoods: item });
      },
      fail: err => console.error(err)
    });
  },
  toSearch() {
    APP.fetch({ route: 'pages/search/index', params: { type: 'pop', page: 1 }});

    wx.navigateTo({ url: '/pages/search/index' });
  },
  toCategory() {
    APP.fetch({ route: 'pages/category/index' });

    wx.navigateTo({ url: '/pages/category/index' });
  },
  loadStart() {
    this.setData({ loaded: false });
  }
});
