const APP = getApp();

Page({
  data: {
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
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptGoodsDetail', data => {
      this.setData({
        topBar: data.topBar,
        topImages: data.itemInfo.topImages,
        goodsInfo: data.itemInfo,
        'goodsInfo.columns': data.columns,
        stock: data.skuInfo,
        'stock.sizeTable': data.itemParams.rule,
        params: data.itemParams.info,
        rate: data.rate,
        'rate.score': data.shopInfo.score,
        detailInfo: data.detailInfo
      });
    });

    APP._fetchGoodsRecommend(goodsRecommend => {
      this.setData({
        goodsRecommend
      });
    });
  }

});
