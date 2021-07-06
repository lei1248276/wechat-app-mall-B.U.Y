import { fetchMallGoods } from '../../api/mall';
import { fetchSubCategoryGoods } from '../../api/category';

const APP = getApp();

Page({
  data: {
    loaded: true,
    mallGoods: [{ type: 'new', page: 0, total: 0 }],
    tags: [{ title: '全部新品', key: '' }],
    tagsColor: {
      color: '#ffe1e1',
      textColor: '#ad0000',
      active_color: '#114357',
      active_textColor: '#f29492'
    },
    tagIndex: 0,
    total: 0
  },
  onLoad: function() {
    this._fetchMallGoods();
  },
  onReady() {
    APP.fetch('pages/mall/page/category/index');
    APP.take('pages/mall/page/category/index').then(res => {
      this.setData({
        tags: this.data.tags.concat(res.slice(0, 6).map(v => ({ title: v.title, key: v.miniWallkey })))
      });
    });
  },
  onScrollLower() {
    this._fetchMallGoods();
  },
  _fetchMallGoods() {
    this.loadStart();
    const goods = this.data.mallGoods[0], { type, page } = goods;

    fetchMallGoods({
      params: { type, page: page + 1 },
      success: res => {
        const data = res.data.data,
          item = {
            list: goods.list ? goods.list.concat(data.list) : data.list,
            type: data.sort,
            page: data.page,
            total: data.total
          };
        this.setData({ loaded: true, 'mallGoods[0]': item });
      },
      fail: err => console.error(err)
    });
  },
  _fetchSubCategoryGoods(i, params) {
    fetchSubCategoryGoods({
      params: params || { miniWallkey: this.data.tags[i].key, type: 'sell' },
      success: res => {
        const list = res.data, item = { list, total: list.length };
        this.setData({ tagIndex: i, [`mallGoods[${i}]`]: item });
      },
      fail: err => console.error(err)
    });
  },
  toSearch() {
    APP.fetch('pages/search/index');

    wx.navigateTo({ url: '/pages/search/index' });
  },
  toCategory() {
    // APP.fetch('pages/category/index');

    wx.navigateTo({
      url: './page/category/index',
      events: {
        acceptCategory: (i, params) => this.onTag(i + 1, params)
      }
    });
  },
  loadStart() {
    this.setData({ loaded: false });
  },
  // ! 点击tag发出请求切换页面内容
  onTag(event, params) {
    const i = typeof event === 'number' ? event : event.currentTarget.dataset.index,
      { tagIndex, mallGoods } = this.data;
    if (mallGoods[i]) {
      if (Number(i) === 0 || tagIndex === i) return this.setData({ tagIndex: 0 });

      this.setData({ tagIndex: i });
    } else if (Number(i) !== 0 && tagIndex !== i) {
      this._fetchSubCategoryGoods(i, params);
    }
  }
});
