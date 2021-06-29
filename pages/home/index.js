import { fetchGoods } from '../../api/home';
const APP = getApp();

Page({
  data: {
    loaded: false,
    photo: '',
    goods: [],
    disDrawing: ''
  },
  onLoad: function() {
    APP.take('pages/home/index').then(res => {
      const [goods, disDrawing] = res,
        data = [{
          drawing: goods.list[0],
          list: goods.list.slice(1, goods.list.length),
          type: goods.sort,
          page: goods.page
        }],
        list = data[0].list,
        photo = list.splice(0, 1)[0];

      this.setData({ photo, goods: data, disDrawing });
    });
  },
  onReady() {
    this._fetchGoods();
  },
  onReachBottom() {
    this._fetchGoods();
  },
  _fetchGoods() {
    this.loadStart();
    const goods = this.data.goods, { type, page } = goods[goods.length - 1];

    fetchGoods({
      params: { type, page: page + 1 },
      success: res => {
        const data = res.data.data,
          item = {
            drawing: data.list[0],
            list: data.list.slice(1, data.list.length),
            type: data.sort,
            page: data.page
          };
        goods.push(item);
        this.setData({ goods, loaded: false });
      },
      fail: err => console.error(err)
    });
  },
  loadStart() {
    this.setData({ loaded: true });
  }
});
