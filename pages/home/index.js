import { getGoods } from '../../api/home';

const globalData = getApp().globalData;

Page({
  data: {
    loaded: false,
    photo: '',
    disDrawing: [],
    goods: [
      { drawing: '', list: [] }
    ],
    page: 1,
    type: ''
  },
  onLoad: function(options) {
    const globalGoods = globalData.goods,
      list = globalGoods.list,
      photo = list.splice(0, 1)[0],
      goods = { drawing: list[0], list: list.slice(1, list.length) };
    this.setData({
      disDrawing: globalData.disDrawing,
      photo,
      goods: [goods],
      page: globalGoods.page,
      type: globalGoods.sort
    });
  },
  onReady() {
    this.fetchGoods();
  },
  onReachBottom() {
    this.fetchGoods();
  },
  fetchGoods() {
    this.startLoad();

    const { type, page, goods } = this.data;
    getGoods({
      params: { type, page: page + 1 },
      success: res => {
        const data = res.data.data,
          newGoods = { drawing: data.list[0], list: data.list.slice(1, data.list.length) };
        this.setData({
          goods: [...goods, newGoods],
          type: data.sort,
          page: data.page,
          loaded: false
        });
      },
      fail(e) {
        console.log(e);
      }
    });
  },
  startLoad() {
    this.setData({
      loaded: true
    });
  }
});
