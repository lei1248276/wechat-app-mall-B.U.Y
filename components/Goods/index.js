const APP = getApp();

Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    progress: {
      type: Boolean,
      value: false
    },
    scrollY: {
      type: Boolean,
      value: false
    },
    scrollX: {
      type: Boolean,
      value: true
    },
    scrollTo: {
      type: Boolean,
      value: false
    },
    height: {
      type: String,
      value: '100vh'
    }
  },
  data: {
    percentage: 8,
    scroll_y: 'flex-wrap: wrap;',
    scroll_x: 'flex-wrap: nowrap; height: 600rpx;',
    scrollTop: 0
  },
  methods: {
    onScroll(e) {
      const initVal = 8,
        detail = e.detail,
        step = Math.round(detail.scrollLeft / detail.scrollWidth * 100),
        percentage = this.data.percentage - initVal;
      if (percentage !== step) {
        this.setData({
          percentage: step + initVal
        });
      }
    },
    onScrollLower() {
      this.triggerEvent('scrollLower');
    },
    toGoodsDetail(e) {
      const iid = e.target.dataset.iid;
      APP.fetch(`pages/goodsDetail/index?iid=${iid}`);

      wx.navigateTo({ url: `/pages/goodsDetail/index?iid=${iid}` });
    },
    onScrollTo(e) {
      /* this.createSelectorQuery()
        .select('.goods .scroll_view')
        .node()
        .exec(res => {
          const scrollView = res[0].node;
          console.log(scrollView);
           scrollView.scrollTo({
            top: 0,
            left: 0,
            animated: true
          });
        });*/
      this.setData({ scrollTop: 0 });
    }
  }
});
