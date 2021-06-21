Component({
  properties: {
    i: {
      type: Number || String,
      value: 0
    },
    count: {
      type: Number,
      value: 1
    },
    w: {
      type: String,
      value: '50rpx'
    },
    h: {
      type: String,
      value: '6rpx'
    }
  },
  data: {},
  methods: {
    onClick(e) {
      this.triggerEvent('onClick', e.currentTarget.dataset.index);
    }
  }
});
