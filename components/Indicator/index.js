Component({
  properties: {
    i: {
      type: Number || String,
      value: 0
    },
    count: {
      type: Number,
      value: 1
    }
  },
  data: {},
  methods: {
    onClick(e) {
      this.triggerEvent('onClick', e.currentTarget.dataset.index);
    }
  }
});
