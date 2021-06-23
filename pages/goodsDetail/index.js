Page({
  data: {
    topBar: {},
    topImages: [],
    itemInfo: {},
    columns: [],
    stock: {},
    params: {},
    rate: {}
  },
  onLoad: function() {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptGoodsDetail', data => {
      console.log(data);
      this.setData({
        topBar: data.topBar,
        topImages: data.itemInfo.topImages,
        itemInfo: data.itemInfo,
        'itemInfo.columns': data.columns,
        stock: data.skuInfo,
        'stock.sizeTable': data.itemParams.rule,
        params: data.itemParams.info,
        rate: data.rate,
        'rate.score': data.shopInfo.score
      });
    });
  }

});
