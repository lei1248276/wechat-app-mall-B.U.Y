import Toast from '@vant/weapp/toast/toast';

const APP = getApp(),
  globalData = APP.globalData;

Page({
  data: {
    isEmpty: false,
    topBar: {},
    topImages: [],
    goodsInfo: {},
    columns: [],
    stock: {},
    goodsRecommend: [],
    params: {},
    rate: {},
    detailInfo: {},
    boughtGoods: {},
    bagGoodsInfo: 0
  },
  onLoad: function({ iid }) {
    const page = getCurrentPages(), route = page[page.length - 1].route;
    APP.take(`${route}?iid=${iid}`).then(res => {
      const [goodsDetail, goodsRecommend] = res;
      if (!goodsDetail) return this.setData({ isEmpty: true });

      const skuImg = [];
      goodsDetail.skuInfo.skus.forEach((v, i, arr) => {
        if (i === 0 || arr[i].style !== arr[i - 1].style) {
          skuImg.push('https:' + arr[i].img);
        }
      });
      this.setData({
        goodsRecommend,
        topBar: goodsDetail.topBar,
        topImages: goodsDetail.itemInfo.topImages,
        goodsInfo: goodsDetail.itemInfo,
        'goodsInfo.columns': goodsDetail.columns,
        stock: goodsDetail.skuInfo,
        'stock.sizeTable': goodsDetail.itemParams.rule,
        'stock.skuImg': skuImg,
        params: goodsDetail.itemParams.info,
        rate: goodsDetail.rate,
        'rate.score': goodsDetail.shopInfo.score,
        detailInfo: goodsDetail.detailInfo,
        bagGoodsInfo: globalData.purchase.size
      });
    });
  },
  onSelColor(e) {
    const { img, color } = e.detail;
    Object.assign(this.data.boughtGoods, { img, color });
  },
  onSelSize(e) {
    const size = e.detail;
    Object.assign(this.data.boughtGoods, { size });
  },
  onAddBag() {
    const data = this.data,
      { color, size, img } = data.boughtGoods,
      goods = globalData.purchase.get(color + size);

    if (color && size) {
      Toast.success('添加成功');
      globalData.isRefresh = true;
      if (goods) return ++goods.count;

      const { title, lowNowPrice: price, lowPrice: oldPrice, iid } = data.goodsInfo,
        { skuImg, props } = data.stock,
        item = { title, iid, color, size, img, count: 1, selected: false, price: Number(price), oldPrice: Number(oldPrice), stock: { skuImg, colorList: props[0].list, sizeList: props[1].list }};

      globalData.purchase.set(color + size, item);
      this.setData({ bagGoodsInfo: globalData.purchase.size });
    } else {
      Toast.fail('请选择商品');
    }
  },
  toPay() {
    const { color, size, img } = this.data.boughtGoods;
    if (color && size) {
      wx.navigateTo({
        url: '/pages/pay/index',
        success: res => {
          res.eventChannel.emit('acceptPayItem', {
            imgs: [img],
            totalPrice: this.data.goodsInfo.lowNowPrice
          });
        }
      });
    } else {
      Toast.fail('请选择商品');
    }
  },
  toBack() {
    wx.navigateBack();
  }
});
