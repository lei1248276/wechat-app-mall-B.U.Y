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
      APP.fetch({ route: 'pages/goodsDetail/index', params: { iid }});

      wx.navigateTo({ url: `/pages/goodsDetail/index?iid=${iid}` });
    }
  }
});
