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
    // ! 用作判断是否全选
    this.selectedNum = 0;

    // ! 随便搞点数据。。。
    APP.take('pages/search/index').then(like => this.setData({ like }));
  },
  onShow() {
    // ! 用作判断是否更改本地purchase数据
    if (globalData.isRefresh) {
      globalData.isRefresh = false;
      this.setData({ purchase: [...globalData.purchase.values()].reverse(), isSelectAll: false });
    }
  },
  onHide() {
    // ! 如果更改了本地purchase数据就刷新全局
    if (globalData.isRefresh) {
      globalData.purchase = new Map(this.data.purchase.reduceRight((acc, cur) => {
        acc.push([cur.id, cur]);
        return acc;
      }, []));
    }
  },
  onConfig() {
    this.setData({ isConfig: !this.data.isConfig });
    Toast.loading({ message: '加载中...', forbidClick: true, duration: 500 });
  },
  onSelect({ target: { dataset: { index: i }}}) {
    // eslint-disable-next-line prefer-const
    let { purchase, totalPrice, isSelectAll } = this.data, { selected, price, count } = purchase[i];

    if (selected) {
      --this.selectedNum;
      totalPrice = totalPrice - price * count;
      this.setData({ [`purchase[${i}].selected`]: false, isSelectAll: false, totalPrice });
    } else {
      ++this.selectedNum;
      totalPrice = totalPrice + price * count;
      isSelectAll = this.selectedNum === purchase.length;
      this.setData({ [`purchase[${i}].selected`]: true, isSelectAll, totalPrice });
    }
  },
  onDelete({ target: { dataset: { index: i }}}) {
    let { purchase, totalPrice } = this.data;
    // * 点击 card 删除按钮时
    if (i !== undefined) {
      const { price, count, selected } = purchase[i];
      purchase.splice(i, 1);
      if (selected) {
        --this.selectedNum;
        totalPrice = totalPrice - price * count;
      }
    } else {
      // * 点击 submit-bar 删除按钮时
      totalPrice = this.selectedNum = 0;
      purchase = purchase.filter(v => !v.selected);
    }
    // ! 刷新全局的 purchase
    globalData.isRefresh = true;
    this.setData({ purchase, totalPrice, isSelectAll: this.selectedNum === purchase.length });
  },
  onSet({ target: { dataset: { index: i }}}) {
    const { desc, color, size, img, price, oldPrice, stock } = this.data.purchase[i];
    this.setData({
      selectIndex: i,
      popupShow: true,
      popupGoods: { desc, img, color, size, stock, price, oldPrice }
    });
  },
  onCloseSet(e) {
    const selectGoods = e.detail;
    // * 选择更改商品时
    if (selectGoods) {
      const { selectIndex, purchase, totalPrice } = this.data,
        { color, size, img } = selectGoods,
        { selected, price, count } = purchase[selectIndex],
        findIndex = purchase.findIndex(v => v.id === color + size);

      // * 更改的商品不存在就更改内容
      if (findIndex === -1) {
        purchase[selectIndex] = Object.assign(purchase[selectIndex], { color, size, img });
      } else {
        // * 更改的商品已经存在就删除选择的（如果还是选定状态就减去对应价钱）
        if (selected) {
          --this.selectedNum;
          this.setData({ totalPrice: totalPrice - price * count });
        }
        purchase.splice(selectIndex, 1);
        Toast.fail('商品已存在！');
      }
      // ! 刷新全局的 purchase
      globalData.isRefresh = true;
      this.setData({ purchase, popupShow: false, isSelectAll: this.selectedNum === purchase.length });
    } else {
      // * 没有更改商品时，仅仅关闭popup
      this.setData({ popupShow: false });
    }
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
      this.selectedNum = totalPrice = 0;
      purchase.forEach(v => { v.selected = false; });
    } else {
      this.selectedNum = purchase.length;
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
    if (data.isConfig) return console.log(`移至愿望清单`);

    if (data.totalPrice) {
      const imgs = [];

      data.purchase.forEach(v => { if (v.selected) imgs.push(v.img); });
      globalData.payItem = { imgs, totalPrice: data.totalPrice };
      wx.navigateTo({ url: '/pages/pay/index' });
    } else {
      Toast.fail('请选择商品');
    }
  }
});
