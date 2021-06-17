import { getGoodsDetail } from '../../../../api/goodsDetail';

Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },
  methods: {
    toGoodsDetail() {
      const iid = this.data.data.iid;
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
