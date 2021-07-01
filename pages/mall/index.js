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
    APP.fetch('pages/category/index');
    APP.take('pages/category/index').then(res => {
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
  _fetchSubCategoryGoods(i) {
    fetchSubCategoryGoods({
      params: { miniWallkey: this.data.tags[i].key, type: 'sell' },
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
      url: '/pages/category/index',
      events: {
        acceptCategory: (list, title, total) => {
          const { tags } = this.data, i = tags.findIndex(v => v.title === title);

          if (i !== -1) {
            this.onTag(i);
          } else {
            this.setData({
              [`mallGoods[${tags.length}]`]: { list, total },
              [`tags[${tags.length}]`]: { title },
              tagIndex: tags.length
            });
          }
        }
      }
    });
  },
  loadStart() {
    this.setData({ loaded: false });
  },
  onTag(e) {
    const i = typeof e === 'object' ? e.currentTarget.dataset.index : e,
      { tagIndex, mallGoods } = this.data;
    if (mallGoods[i]) {
      if (Number(i) === 0 || tagIndex === i) return this.setData({ tagIndex: 0 });

      this.setData({ tagIndex: i });
    } else if (Number(i) !== 0 && tagIndex !== i) {
      this._fetchSubCategoryGoods(i);
    }
  }
});
