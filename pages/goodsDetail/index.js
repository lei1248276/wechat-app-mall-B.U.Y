Page({
  data: {
    data: {}
  },
  onLoad: function() {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptGoodsDetail', data => {
      console.log(data);
      this.setData({
        data
      });
    });
  }
});
