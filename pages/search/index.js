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
    const { tabs, currentIndex } = this.data;
    this.fetchPopularGoods(tabs[currentIndex]);
  },
  fetchPopularGoods(type) {
    APP._fetchPopularGoods({ type, page: 1 }, popularGoods => {
      this.setData({
        [`popularGoods.${type}`]: popularGoods
      });
    });
  },
  onSearch() {
    console.log(`search`);
  },
  onChange(e) {
    const i = e.detail.index,
      { popularGoods, tabs } = this.data;
    if (!popularGoods[tabs[i]].length) {
      this.fetchPopularGoods(tabs[i]);
    }

    this.setData({
      currentIndex: e.detail.index
    });
  }
});
