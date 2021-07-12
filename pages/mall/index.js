import { fetchMallGoods } from '../../api/mall';
import { fetchSubCategoryGoods } from '../../api/category';

import { randomRange } from '../../utils/util';

const APP = getApp();

Page({
  data: {
    loaded: true,
    mallGoods: [{ type: 'new', page: randomRange(1, 10), total: 0 }],
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
  _fetchSubCategoryGoods(i, options) {
    const tag = this.data.tags[i],
      { params, title } = options || { params: { miniWallkey: tag.key, type: 'sell' }, title: tag.title };

    fetchSubCategoryGoods({
      params,
      success: res => {
        const list = res.data, item = { list, total: list.length, title };
        this.setData({
          [`tags[${i}]`]: { title, key: '' },
          [`mallGoods[${i}]`]: item,
          tagIndex: i
        });
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
        acceptCategory: (i, options) => this.onTag(i + 1, options)
      }
    });
  },
  loadStart() {
    this.setData({ loaded: false });
  },
  // ! 点击tag发出请求切换页面内容
  onTag(event, options) {
    const i = typeof event === 'number' ? event : event.currentTarget.dataset.index,
      { tagIndex, mallGoods } = this.data;
    if (mallGoods[i]) {
      if (Number(i) === 0 || tagIndex === i) return this.setData({ tagIndex: 0 });

      this.setData({ tagIndex: i });
    } else if (Number(i) !== 0 && tagIndex !== i) {
      this._fetchSubCategoryGoods(i, options);
    }
  }
});
