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
    show: false
  },
  computed: {
    temp(data) {
      const imgs = data.list.detailImage;
      if (imgs) {
        return imgs[0].list.slice(0, 4);
      }
      return null;
    }
  },
  methods: {
    onImg(e) {
      const i = e.target.dataset.index,
        data = this.data,
        imgs = data.show
          ? data.list.detailImage[0].list.map(v => 'https:' + v)
          : data.temp.map(v => 'https:' + v);
      wx.previewImage({
        urls: imgs,
        current: imgs[i]
      });
    },
    onLookMore() {
      this.setData({
        show: !this.show
      });
    }
  }
});
