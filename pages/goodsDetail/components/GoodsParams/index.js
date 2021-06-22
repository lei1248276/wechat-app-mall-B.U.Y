const computed = require('miniprogram-computed').behavior;

Component({
  behaviors: [computed],
  properties: {
    list: {
      type: Object,
      value: {}
    }
  },
  data: {
    show: false
  },
  computed: {
    temp(data) {
      if (data.list.set) {
        return data.list.set.slice(0, 4);
      }
      return null;
    }
  },
  methods: {
    onLookMore() {
      this.setData({
        show: true
      });
    },
    onClose() {
      this.setData({
        show: false
      });
    }
  }
});
