const globalData = getApp().globalData,
  computed = require('miniprogram-computed').behavior;

Component({
  behaviors: [computed],
  data: {
    purchase: [],
    totalPrice: 0,
    isSelectAll: false
  },
  lifetimes: {
    created() {
      this.selectNum = 0;
    }
  },
  pageLifetimes: {
    show() {
      const globalPurchase = globalData.purchase;
      if (globalData.isRefresh) {
        globalData.isRefresh = false;
        this.setData({ purchase: [...globalPurchase.values()] });
      }
    }
  },
  computed: {
    vipPoint({ totalPrice }) {
      return Math.ceil(totalPrice);
    }
  }

});
