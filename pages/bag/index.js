Page({
  data: {
    checked: false,
    select: false,
    tip: false,
    imageURL: '/assets/cover.png'
  },
  onLoad: function(options) {

  },
  onSelect() {
    this.setData({
      select: !this.data.select
    });
  },
  onClickAll(e) {
    console.log(e);
    this.setData({
      checked: e.detail
    });
  },
  onClickBuy(e) {
    console.log(e);
  }
});
