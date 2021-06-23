Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    }
  },
  data: {},
  methods: {
    onClick() {
      this.triggerEvent('click');
    }
  }
});
