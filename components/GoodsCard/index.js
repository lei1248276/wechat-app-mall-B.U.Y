Component({
  properties: {
    checked: Boolean
  },
  data: {

  },
  methods: {
    onClick() {
      this.triggerEvent('check');
    }
  }
});
