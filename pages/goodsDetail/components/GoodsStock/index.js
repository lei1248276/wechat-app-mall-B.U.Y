Component({
  properties: {
    list: {
      type: Object,
      value: {}
    }
  },
  data: {
    show: false,
    curColorIndex: -1,
    curSizeIndex: -1
  },
  methods: {
    onLookColor() {
      const imgs = this.data.list.skuImg;
      wx.previewImage({
        urls: imgs,
        current: imgs[0]
      });
    },
    onSelectColor(e) {
      const { index: i, name: color } = e.target.dataset, img = this.data.list.skuImg[i];

      // 因为使用了事件委托，防止点到空白处时报错
      if (typeof i === 'number') {
        this.setData({
          curColorIndex: i
        });
        this.triggerEvent('selColor', { img, color });
      }
    },
    onLookSize() {
      this.setData({
        show: true
      });
    },
    onSelectSize(e) {
      const { index: i, name: size } = e.target.dataset;

      // 因为使用了事件委托，防止点到空白处时报错
      if (typeof i === 'number') {
        this.setData({
          curSizeIndex: i
        });
        this.triggerEvent('selSize', size);
      }
    },
    onClose() {
      this.setData({
        show: false
      });
    }
  }
});
