Component({
  properties: {
    list: {
      type: Object,
      value: {}
    }
  },
  data: {
    show: false
  },
  methods: {
    onLookColor() {
      const imgs = [];
      this.data.list.skus.forEach((v, i, arr) => {
        if (i === 0 || arr[i].style !== arr[i - 1].style) {
          imgs.push('https:' + arr[i].img);
        }
      });
      wx.previewImage({
        urls: imgs,
        current: imgs[0]
      });
    },
    onLookSize() {
      this.setData({
        show: true
      });
    },
    onClose() {
      this.setData({
        show: false
      });
    }
  }
});
