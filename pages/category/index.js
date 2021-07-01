import { fetchSubCategory, fetchSubCategoryGoods } from '../../api/category';
const APP = getApp();

Page({
  data: {
    category: [],
    subCategory: [],
    currentIndex: 0
  },
  onLoad: function() {
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
    fetchSubCategoryGoods({
      params: { miniWallkey: category[i].miniWallkey, type: 'sell' },
      success: result => {
        wx.navigateBack({
          delta: 1,
          success: () => {
            this.eventChannel.emit('acceptCategory', result.data, category[i].title, result.data.length);
          }
        });
      },
      fail: err => console.error(err)
    });
  }
});
