import { fetchPopularGoods } from '../../api/search';
const APP = getApp();

Page({
  data: {
    value: '',
    tabs: ['pop', 'new', 'sell'],
    currentIndex: 0,
    popularGoods: {
      'pop': [],
      'new': [],
      'sell': []
    },
    popBrand: ['Acne Studios', 'alexanderwang', 'Maison Margiela', 'JACQUEMUS', 'ADER error', 'We11Done']
  },
  onLoad: function() {
    const page = getCurrentPages(), route = page[page.length - 1].route,
      { tabs, currentIndex } = this.data, type = tabs[currentIndex];
    APP.take(route).then(popularGoods => this.setData({
      [`popularGoods.${type}`]: popularGoods
    }));
  },
  _fetchPopularGoods(type) {
    fetchPopularGoods({
      params: { type, page: 1 },
      success: res => this.setData({
        [`popularGoods.${type}`]: res.data.data.list
      }),
      fail: err => console.err(err)
    });
  },
  onSearch() {
    console.log(`search`);
  },
  onChange(e) {
    const i = e.detail.index,
      { popularGoods, tabs } = this.data;
    if (!popularGoods[tabs[i]].length) {
      this._fetchPopularGoods(tabs[i]);
    }

    this.setData({
      currentIndex: e.detail.index
    });
  }
});
