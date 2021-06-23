Component({
  properties: {
    list: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    onImage(e) {
      const data = e.target.dataset;
      data.imgs = data.imgs.map(v => 'https:' + v);
      data.img = 'https:' + data.img;
      wx.previewImage({
        urls: data.imgs,
        current: data.img,
        showmenu: true
      });
    }
  }
});
