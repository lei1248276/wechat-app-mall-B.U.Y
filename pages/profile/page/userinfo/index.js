Page({
  data: {
    phoneNumber: '',
    email: '',
    address: '',
    user: ''
  },
  onLoad: function() {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptUserinfo', userinfo => {
      let sex;
      switch (userinfo.gender) {
        case 0: sex = '???'; break;
        case 1: sex = '男'; break;
        case 2: sex = '女'; break;
      }
      this.setData({
        user: `${userinfo.nickName} ${sex}, ...`
      });
    });
  }
});
