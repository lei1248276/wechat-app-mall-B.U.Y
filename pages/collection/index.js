const APP = getApp(),
  globalData = APP.globalData;

Page({
  data: {
    collection: [],
    currentIndex: 0,
    isSelected: false
  },
  onLoad: function() {
    this.setData({ collection: [...globalData.collection.values()].reverse() });
  },
  onChange(e) {
    this.setData({ currentIndex: e.detail.index });
  },
  onConfig() {
    this.setData({ isSelected: !this.data.isSelected });
  },
  toGoodsDetail({ target: { dataset: { index: i }}}) {
    const iid = this.data.collection[i].iid;
    APP.fetch(`pages/goodsDetail/index?iid=${iid}`);

    wx.navigateTo({ url: `/pages/goodsDetail/index?iid=${iid}` });
  },
  onSelect({ target: { dataset: { index: i }}}) {
    this.setData({ [`collection[${i}].selected`]: !this.data.collection[i].selected });
    console.log(this.data.collection[i].selected);
  },
  onDelete({ target: { dataset: { index: i }}}) {
    const collection = this.data.collection;
    globalData.collection.delete(collection[i].iid);
    collection.splice(i, 1);
    this.setData({ collection });
  },
  toMall() {
    wx.switchTab({
      url: '/pages/mall/index'
    });
  }
});
