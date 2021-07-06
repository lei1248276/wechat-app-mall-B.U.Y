import Toast from '@vant/weapp/toast/toast';

const APP = getApp();

Page({
  data: {
    purchase: [],
    like: [],
    isConfig: false,
    tip: false,
    isSelectAll: false,
    totalPrice: 0,
    vipPoint: 0
  },
  onLoad: function() {
    // 用作判断是否全选
    this.selectNum = 0;

    // 随便搞点数据。。。
    APP.take('pages/search/index').then(like => this.setData({ like }));
  },
  onShow() {
    const globalData = APP.globalData;
    if (globalData.isRefresh) {
      globalData.isRefresh = false;
      this.setData({ purchase: [...globalData.purchase.values()] });
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
    let { purchase, totalPrice, vipPoint } = this.data, { selected, price, count } = purchase[i];

    if (selected) {
      --this.selectNum;
      totalPrice = this.fixedFloat(totalPrice - price * count);
      vipPoint = Math.ceil(totalPrice);
      this.setData({ [`purchase[${i}].selected`]: false, isSelectAll: false, totalPrice, vipPoint });
    } else {
      ++this.selectNum;
      totalPrice = this.fixedFloat(totalPrice + price * count);
      vipPoint = Math.ceil(totalPrice);
      this.selectNum === purchase.length
        ? this.setData({ [`purchase[${i}].selected`]: true, isSelectAll: true, totalPrice, vipPoint })
        : this.setData({ [`purchase[${i}].selected`]: true, totalPrice, vipPoint });
    }
  },
  onClose({ target: { dataset: { index: i }}}) {
    // eslint-disable-next-line prefer-const
    let { purchase, totalPrice, vipPoint } = this.data, globalPurchase = APP.globalData.purchase;
    if (i !== undefined) {
      const { price, count, color, size, selected } = purchase[i];
      purchase.splice(i, 1);
      globalPurchase.delete(color + size);
      selected && (totalPrice = this.fixedFloat(totalPrice - price * count));
    } else {
      totalPrice = 0;
      purchase = purchase.filter(v => {
        if (v.selected) globalPurchase.delete(v.color + v.size);
        return !v.selected;
      });
    }
    vipPoint = Math.ceil(totalPrice);
    this.setData({ purchase, totalPrice, vipPoint });
  },
  onSelect() {
    console.log(`onselct`);
  },
  onPlus({ target: { dataset: { index: i }}}) {
    const { count, selected, price } = this.data.purchase[i];
    let { totalPrice, vipPoint } = this.data;

    if (selected) totalPrice = this.fixedFloat(totalPrice + price);
    vipPoint = Math.ceil(totalPrice);
    this.setData({ [`purchase[${i}].count`]: count + 1, totalPrice, vipPoint });
  },
  onMinus({ target: { dataset: { index: i }}}) {
    const { count, selected, price } = this.data.purchase[i];
    let { totalPrice, vipPoint } = this.data;

    if (selected) totalPrice = this.fixedFloat(totalPrice - price);
    vipPoint = Math.ceil(totalPrice);
    this.setData({ [`purchase[${i}].count`]: count - 1, totalPrice, vipPoint });
  },
  onClickAll() {
    const { purchase, isSelectAll } = this.data;
    let totalPrice;

    if (isSelectAll) {
      this.selectNum = totalPrice = 0;
      purchase.forEach(v => { v.selected = false; });
    } else {
      this.selectNum = purchase.length;
      totalPrice = this.fixedFloat(purchase.reduce((acc, cur) => {
        cur.selected = true;
        return acc + cur.price * cur.count;
      }, 0));
    }
    this.setData({ isSelectAll: !isSelectAll, purchase, totalPrice, vipPoint: Math.ceil(totalPrice) });
  },
  onClickBuy(e) {
    if (this.data.isConfig) {
      console.log(`移至愿望清单`);
    } else {
      console.log(e);
    }
  },
  fixedFloat(number) {
    if (typeof number !== 'number') throw new Error('必须为number类型');
    return parseFloat(number.toFixed(2));
  }
});
