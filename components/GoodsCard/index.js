Component({
  options: {
    multipleSlots: true
  },
  properties: {
    isSelected: Boolean,
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
    onDelete() {
      this.triggerEvent('delete');
    },
    onSelect(e) {
      this.triggerEvent('select');
    },
    onImage() {
      this.triggerEvent('image');
    },
    onSet() {
      this.triggerEvent('set');
    },
    onPlus() {
      this.triggerEvent('plus');
    },
    onMinus() {
      this.triggerEvent('minus');
    }
  }
});
