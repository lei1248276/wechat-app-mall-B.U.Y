const computed = require('miniprogram-computed').behavior;

Component({
  behaviors: [computed],
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
  computed: {
    getImgs(data) {
      if (data.list.skus) {
        const imgs = [];
        data.list.skus.forEach((v, i, arr) => {
          if (i === 0 || arr[i].style !== arr[i - 1].style) {
            imgs.push('https:' + arr[i].img);
          }
        });
        return imgs;
      }
      return null;
    }
  },
  methods: {
    onLookColor() {
      const imgs = this.data.getImgs;
      wx.previewImage({
        urls: imgs,
        current: imgs[0]
      });
    },
    onSelectColor(e) {
      const { index: i, name: color } = e.target.dataset, img = this.data.getImgs[i];

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
