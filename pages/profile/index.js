import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    point: 0,
    userInfo: {},
    show: false
  },
  onLogin() {
    if (!this.data.userInfo.nickName) {
      wx.getUserProfile({
        desc: '测试',
        success: res => {
          this.setData({
            userInfo: res.userInfo,
            point: 3000
          });
        }
      });
    }
  },
  onQRcode() {
    if (this.data.userInfo.nickName) {
      this.setData({ show: true });
    } else {
      Toast.fail('请登录！');
    }
  },
  onCloseQRcode() {
    this.setData({ show: false });
  }
});
