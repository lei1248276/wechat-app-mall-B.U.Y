const globalData = getApp().globalData;

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
  pageLifetimes: {
    show() {
      const page = getCurrentPages(), collection = globalData.collection;
      this.iid = page[page.length - 1].iid;

      if (collection.has(this.iid)) {
        this.setData({ collected: collection.get(this.iid).collected });
      }
    }
  },
  methods: {
    onChange(e) {
      this.setData({
        index: e.detail.current
      });
    },
    onLookImg(e) {
      const i = e.target.dataset.index,
        imgs = this.data.list.map(v => 'https:' + v);
      wx.previewImage({
        urls: imgs,
        current: imgs[i]
      });
    },
    onCollect() {
      const { collected } = this.data;
      this.setData({
        collected: !collected
      });
      this.triggerEvent('collect', collected);
    }
  }
});
