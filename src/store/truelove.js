const formData = {
  tags: [],
  title: "",
  author: "",
  protagonist: "",
  firstPublish: "",
  copyWriting: "",
};

const trueloveStore = {
  namespaced: true,
  state: {
    trueloveDialogVisible: false,
    trueloves: [],
    // 表单数据
    trueloveForm: formData,
  },
  mutations: {
    CHANGETRUELOVEDIALOGVISIBLE(store, obj) {
      store.trueloveDialogVisible = obj.isShowDialog;
      store.trueloveForm = obj.truelove ? obj.truelove : formData;
    },
    UPDATETRUELOVES(store, val) {
      store.trueloves = val;
    },
  },
  actions: {
  }
}

export default trueloveStore;