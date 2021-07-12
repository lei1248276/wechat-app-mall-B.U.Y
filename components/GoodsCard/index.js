Component({
  options: {
    multipleSlots: true
  },
  properties: {
    isSelected: Boolean, // card是否可选
    selected: Boolean, // 改变选定状态（前提是 isSelected为true）
    image: String,
    title: String,
    params: String,
    count: Number || String,
    price: String,
    oldPrice: String,
    isCollect: Boolean // 是否显示可收藏
  },
  data: {

  },
  methods: {
    onDelete() {
      this.triggerEvent('delete');
    },
    onCollect() {
      this.triggerEvent('collect');
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
