import { fetchSubCategory } from '../../api/category';
const APP = getApp();

Page({
  data: {
    category: [],
    subCategory: [],
    currentIndex: 0
  },
  onLoad: function() {
    // ! 获取上个页面的引用，方便传递数据
    this.eventChannel = this.getOpenerEventChannel();

    const page = getCurrentPages(), route = page[page.length - 1].route;
    APP.take(route).then(category => {
      this._fetchSubCategory(category[0].maitKey, 0);
      this.setData({ category });
    });
  },
  _fetchSubCategory(maitKey, currentIndex) {
    fetchSubCategory({
      params: { maitKey },
      success: res => this.setData({ subCategory: res.data.data.list, currentIndex }),
      fail: err => console.error(err)
    });
  },
  onChange(e) {
    const i = e.detail, { category, currentIndex } = this.data;
    if (i !== currentIndex) {
      this._fetchSubCategory(category[i].maitKey, i);
    }
  },
  onSelectItem() {
    const { category, currentIndex: i } = this.data;
    this.eventChannel.emit('acceptCategory', i, { miniWallkey: category[i].miniWallkey, type: 'sell' });

    wx.navigateBack({ delta: 1 });
  }
});
