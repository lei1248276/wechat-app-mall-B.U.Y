import { getGoodsDetail } from '../../api/goodsDetail';

Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  data: {
    percentage: 8
  },
  methods: {
    onScroll(e) {
      const initVal = 8,
        detail = e.detail,
        step = Math.round(detail.scrollLeft / detail.scrollWidth * 100),
        percentage = this.data.percentage - initVal;
      if (percentage !== step) {
        this.setData({
          percentage: step + initVal
        });
      }
    },
    toGoodsDetail(e) {
      const iid = e.currentTarget.dataset.iid;
      wx.navigateTo({
        url: `/pages/goodsDetail/index?iid=${iid}`,
        success(res) {
          getGoodsDetail({
            params: { iid },
            success({ data: { result }}) {
              res.eventChannel.emit('acceptGoodsDetail', result);
            }
          });
        }
      });
    }
  }
});