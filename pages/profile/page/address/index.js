import { areaList } from '../../../../vendor/area-data';

Page({
  data: {
    areaList,
    show: false,
    popupShow: false,
    name: '',
    country: '中国',
    province: '省份 / 城市 / 地区',
    city: '',
    phoneNumber: ''
  },
  onLoad: function(options) {

  },
  onAddress() {
    wx.chooseAddress({
      success: res => {
        /* console.log(res);
        console.log(res.userName);
        console.log(res.postalCode);
        console.log(res.provinceName);
        console.log(res.cityName);
        console.log(res.countyName);
        console.log(res.detailInfo);
        console.log(res.nationalCode);
        console.log(res.telNumber);*/
      }
    });
  },
  onAddAddress() {
    this.setData({ show: true });
  },
  onProvince() {
    this.setData({ popupShow: true });
  },
  onClosePopup() {
    this.setData({ popupShow: false });
  },
  onConfirm(e) {
    let province = '';
    e.detail.values.forEach(v => {
      province += ' / ' + v.name;
    });
    this.setData({
      province: province.substr(2),
      popupShow: false
    });
  },
  onCancel() {
    this.setData({ popupShow: false });
  },
  onChange() {

  },
  toBack() {
    wx.navigateBack();
  }
});
