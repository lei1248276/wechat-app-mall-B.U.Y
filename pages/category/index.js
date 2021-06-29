const APP = getApp();

Page({
  data: {
    category: [],
    currentIndex: 0
  },
  onLoad: function() {
    const page = getCurrentPages(), route = page[page.length - 1].route;
    APP.take(route).then(category => this.setData({ category }));
  }
});
