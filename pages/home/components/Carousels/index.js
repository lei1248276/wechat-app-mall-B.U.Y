Component({
  properties: {
    list: {
      type: Object,
      value: {}
    }
  },
  data: {
    index: 0
  },
  methods: {
    onChange(e) {
      this.setData({
        index: e.detail.current
      });
    },
    onClick(e) {
      this.setData({
        index: e.detail
      });
    },
    toMall() {
      wx.switchTab({
        url: '/pages/mall/index'
      });
    }
  }
});
