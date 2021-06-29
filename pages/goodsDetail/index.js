import Toast from '@vant/weapp/toast/toast';

const APP = getApp();

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
    detailInfo: {}
  },
  onLoad: function() {
    APP.take('pages/goodsDetail/index').then(res => {
      const [goodsDetail, goodsRecommend] = res;
      if (!goodsDetail) return this.setData({ isEmpty: true });

      this.setData({
        goodsRecommend,
        topBar: goodsDetail.topBar,
        topImages: goodsDetail.itemInfo.topImages,
        goodsInfo: goodsDetail.itemInfo,
        'goodsInfo.columns': goodsDetail.columns,
        stock: goodsDetail.skuInfo,
        'stock.sizeTable': goodsDetail.itemParams.rule,
        params: goodsDetail.itemParams.info,
        rate: goodsDetail.rate,
        'rate.score': goodsDetail.shopInfo.score,
        detailInfo: goodsDetail.detailInfo
      });
    });
  },
  onAddCar() {
    Toast('成功加入购物车');
  },
  toBack() {
    wx.navigateBack();
  }
});
