const APP = getApp();

Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },
  methods: {
    toGoodsDetail() {
      const iid = this.data.data.iid;
      wx.navigateTo({
        url: `/pages/goodsDetail/index?iid=${iid}`,
        success(res) {
          APP._fetchGoodsDetail({ iid }, iid, data => {
            res.eventChannel.emit('acceptGoodsDetail', data);
          });
        }
      });
    }
  }
});
