const globalData = getApp().globalData;

Page({
  data: {
    payItem: {},
    couponCode: '',
    activeNames: ['2'],
    coupon: 0
  },
  onLoad: function() {
    const page = getCurrentPages(), fromPage = page[page.length - 2].route,
      eventChannel = this.getOpenerEventChannel();
    if (fromPage === 'pages/goodsDetail/index') {
      eventChannel.on('acceptPayItem', payItem => this.setData({ payItem }));
    } else {
      this.setData({ payItem: globalData.payItem });
    }
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  }
});
