Component({
  properties: {
    selected: Boolean,
    image: String,
    title: String,
    params: String,
    count: Number || String,
    price: String,
    oldPrice: String
  },
  data: {

  },
  methods: {
    onClose() {
      this.triggerEvent('close');
    },
    onClick(e) {
      this.triggerEvent('click');
    },
    onSelect() {
      this.triggerEvent('select');
    },
    onPlus() {
      this.triggerEvent('plus');
    },
    onMinus() {
      this.triggerEvent('minus');
    }
  }
});
