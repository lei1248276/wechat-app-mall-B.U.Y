Component({
  properties: {
    y: {
      type: String || Number,
      value: 0
    }
  },
  data: {},
  methods: {
    onScrollTo() {
      wx.pageScrollTo({
        scrollTop: Number(this.data.y),
        duration: 300
      });
    }
  }
});
