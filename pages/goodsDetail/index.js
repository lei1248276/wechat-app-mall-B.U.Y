Page({
  data: {
    topBar: {},
    topImages: [],
    itemInfo: {},
    columns: [],
    stock: {}
  },
  onLoad: function() {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptGoodsDetail', data => {
      console.log(data);
      this.setData({
        topBar: data.topBar,
        topImages: data.itemInfo.topImages,
        itemInfo: data.itemInfo,
        columns: data.columns,
        stock: data.skuInfo
      });
    });
  }

});
