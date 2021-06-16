Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  ready() {
    console.log(this.data.list);
  },
  data: {},
  methods: {}
});
