Page({
  data: {
    topBar: {},
    topImages: [],
    itemInfo: {},
    columns: [],
    stock: {},
    params: {}
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
        params: data.itemParams.info
      });
    });
  }

});
