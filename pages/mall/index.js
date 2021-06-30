import { fetchMallGoods } from '../../api/mall';
const APP = getApp();

Page({
  data: {
    loaded: true,
    mallGoods: { type: 'new', page: 0 },
    tags: ['正在流行', '上衣', '裤子', '鞋', '包包', '家具', '零食', '美妆'],
    flag: '全部新品',
    category: []
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
    APP.fetch('pages/search/index');

    wx.navigateTo({ url: '/pages/search/index' });
  },
  toCategory() {
    APP.fetch('pages/category/index');

    wx.navigateTo({
      url: '/pages/category/index',
      events: {
        acceptCategory: (category, flag) => {
          this.setData({ category, flag });
        }
      }
    });
  },
  loadStart() {
    this.setData({ loaded: false });
  }
});
