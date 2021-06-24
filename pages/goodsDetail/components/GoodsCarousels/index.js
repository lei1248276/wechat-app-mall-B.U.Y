Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    list: {
      type: Array,
      value: []
    },
    discount: {
      type: String,
      value: ''
    }
  },
  data: {
    index: 0,
    collected: false
  },
  methods: {
    onChange(e) {
      this.setData({
        index: e.detail.current
      });
    },
    onLookImg(e) {
      const i = e.currentTarget.dataset.index,
        imgs = this.data.list.map(v => 'https:' + v);
      wx.previewImage({
        urls: imgs,
        current: imgs[i]
      });
    },
    onCollect() {
      this.setData({
        collected: !this.data.collected
      });
    }
  }
});
