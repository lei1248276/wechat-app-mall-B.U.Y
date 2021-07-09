Component({
  properties: {
    list: {
      type: Object,
      value: {}
    },
    show: Boolean
  },
  data: {
    currentImgIndex: -1,
    currentSize: '',
    currentColor: ''
  },
  methods: {
    onClose() {
      this.triggerEvent('close');
      this.init();
    },
    onPopupImg({ target: { dataset: { index: i }}}) {
      this.setData({
        currentImgIndex: i,
        currentColor: this.data.list.stock.colorList[i].name
      });
    },
    onSelectSize({ target: { dataset: { name: size }}}) {
      // ! 因为使用了事件委托，防止点到空白处时报错
      if (size) {
        this.setData({
          currentSize: size
        });
      }
    },
    onConfirm() {
      const { currentColor: color, currentSize: size, currentImgIndex, list } = this.data;
      if (size || color) {
        const item = {
          color: color || list.color,
          size: size || list.size,
          img: currentImgIndex === -1 ? list.img : list.stock.skuImg[currentImgIndex]
        };
        this.triggerEvent('close', item);
      } else {
        this.triggerEvent('close');
      }
      this.init();
    },
    init() {
      setTimeout(() => {
        this.setData({ currentSize: '', currentColor: '', currentImgIndex: -1 });
      });
    }
  }
});
