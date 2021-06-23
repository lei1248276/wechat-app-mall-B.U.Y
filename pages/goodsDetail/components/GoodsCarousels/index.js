Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    list: {
      type: Array,
      value: []
    },
    discount: {
      type: String,
      value: ''
    }
  },
  data: {
    index: 0,
    collected: false
  },
  methods: {
    onChange(e) {
      this.setData({
        index: e.detail.current
      });
    },
    onCollect() {
      this.setData({
        collected: !this.data.collected
      });
    }
  }
});
