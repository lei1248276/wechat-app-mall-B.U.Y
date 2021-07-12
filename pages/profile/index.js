import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    point: 0,
    userinfo: {},
    show: false
  },
  onLogin() {
    if (!this.data.userinfo.nickName) {
      wx.getUserProfile({
        desc: '测试',
        success: res => {
          this.setData({
            userinfo: res.userInfo,
            point: 3000
          });
        }
      });
    }
  },
  onQRcode() {
    if (this.data.userinfo.nickName) {
      this.setData({ show: true });
    } else {
      Toast.fail('请登录！');
    }
  },
  onCloseQRcode() {
    this.setData({ show: false });
  },
  onOrderForm() {
    Toast.fail('暂无订单！');
  },
  onCoupon() {
    Toast.fail('暂无兑换券！');
  },
  toUserinfo() {
    if (this.data.userinfo.nickName) {
      wx.navigateTo({
        url: './page/userinfo/index',
        success: res => {
          res.eventChannel.emit('acceptUserinfo', this.data.userinfo);
        }
      });
    } else {
      Toast.fail('请登录！');
    }
  }
});
