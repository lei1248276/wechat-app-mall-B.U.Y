import Toast from '@vant/weapp/toast/toast';

const APP = getApp(),
  globalData = APP.globalData;

Page({
  data: {
    purchase: [],
    like: [],
    isConfig: false,
    tip: false,
    isSelectAll: false,
    totalPrice: 0,
    selectIndex: -1,
    popupShow: false,
    popupGoods: {}
  },
  onLoad: function() {
    // 用作判断是否全选
    this.selectNum = 0;

    // 随便搞点数据。。。
    APP.take('pages/search/index').then(like => this.setData({ like }));
  },
  onShow() {
    if (globalData.isRefresh) {
      globalData.isRefresh = false;
      this.setData({ purchase: [...globalData.purchase.values()], isSelectAll: false });
    }
  },
  onConfig() {
    this.setData({ isConfig: !this.data.isConfig });
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 500
    });
  },
  onAdd({ target: { dataset: { index: i }}}) {
    // eslint-disable-next-line prefer-const
    let { purchase, totalPrice } = this.data, { selected, price, count } = purchase[i];

    if (selected) {
      --this.selectNum;
      totalPrice = totalPrice - price * count;
      this.setData({ [`purchase[${i}].selected`]: false, isSelectAll: false, totalPrice });
    } else {
      ++this.selectNum;
      totalPrice = totalPrice + price * count;
      this.selectNum === purchase.length
        ? this.setData({ [`purchase[${i}].selected`]: true, isSelectAll: true, totalPrice })
        : this.setData({ [`purchase[${i}].selected`]: true, totalPrice });
    }
  },
  onDelete({ target: { dataset: { index: i }}}) {
    // eslint-disable-next-line prefer-const
    let { purchase, totalPrice } = this.data, globalPurchase = globalData.purchase;
    if (i !== undefined) {
      const { price, count, color, size, selected } = purchase[i];
      // 修改本地 purchase 和全局的 purchase
      purchase.splice(i, 1);
      globalPurchase.delete(color + size);
      selected && (totalPrice = totalPrice - price * count);
    } else {
      totalPrice = 0;
      // 修改本地 purchase 和全局的 purchase
      purchase = purchase.filter(v => {
        if (v.selected) globalPurchase.delete(v.color + v.size);
        return !v.selected;
      });
    }
    this.setData({ purchase, totalPrice });
  },
  onSelect({ target: { dataset: { index: i }}}) {
    const { title, color, size, img, price, oldPrice, stock } = this.data.purchase[i];
    wx.hideTabBar({
      animation: true,
      success: () => this.setData({
        selectIndex: i,
        popupShow: true,
        popupGoods: { title, img, color, size, stock, price: price.toFixed(2), oldPrice: oldPrice.toFixed(2) }})
    });
  },
  onCloseSelect(e) {
    const selectGoods = e.detail;
    if (selectGoods) {
      const { selectIndex, purchase } = this.data, globalPurchase = globalData.purchase,
        globalGoods = globalPurchase.get(purchase[selectIndex].color + purchase[selectIndex].size);
      console.log(purchase[selectIndex], selectIndex, globalGoods);
      // 修改本地 purchase 和全局的 purchase
      globalGoods.color = purchase[selectIndex].color = selectGoods.color;
      globalGoods.size = purchase[selectIndex].size = selectGoods.size;
      globalGoods.img = purchase[selectIndex].img = selectGoods.img;
      this.setData({ purchase });
    }
    this.setData({ popupShow: false });
    wx.showTabBar({ animation: true });
  },
  onPlus({ target: { dataset: { index: i }}}) {
    const { count, selected, price } = this.data.purchase[i];
    let { totalPrice } = this.data;

    if (selected) totalPrice = totalPrice + price;
    this.setData({ [`purchase[${i}].count`]: count + 1, totalPrice });
  },
  onMinus({ target: { dataset: { index: i }}}) {
    const { count, selected, price } = this.data.purchase[i];
    let { totalPrice } = this.data;

    if (selected) totalPrice = totalPrice - price;
    this.setData({ [`purchase[${i}].count`]: count - 1, totalPrice });
  },
  onClickAll() {
    const { purchase, isSelectAll } = this.data;
    let totalPrice;

    if (isSelectAll) {
      this.selectNum = totalPrice = 0;
      purchase.forEach(v => { v.selected = false; });
    } else {
      this.selectNum = purchase.length;
      totalPrice = purchase.reduce((acc, cur) => {
        cur.selected = true;
        return acc + cur.price * cur.count;
      }, 0);
    }
    this.setData({ isSelectAll: !isSelectAll, purchase, totalPrice });
  },
  toGoodsDetail({ target: { dataset: { index: i }}}) {
    const iid = this.data.purchase[i].iid;

    APP.fetch(`pages/goodsDetail/index?iid=${iid}`);
    wx.navigateTo({ url: `/pages/goodsDetail/index?iid=${iid}` });
  },
  toPay() {
    const data = this.data;
    if (data.isConfig) {
      console.log(`移至愿望清单`);
    } else {
      if (data.totalPrice) {
        const imgs = [];

        data.purchase.forEach(v => { if (v.selected) imgs.push(v.img); });
        globalData.payItem = { imgs, totalPrice: data.totalPrice };
        wx.navigateTo({ url: '/pages/pay/index' });
      } else {
        Toast.fail('请选择商品');
      }
    }
  }
});
