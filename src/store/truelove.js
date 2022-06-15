const trueloveStore = {
  namespaced: true,
  state: {
    trueloveDialogVisible: false,
    trueloves: [],
    editTruelove: null
  },
  mutations: {
    CHANGETRUELOVEDIALOGVISIBLE(store, obj) {
      store.trueloveDialogVisible = obj.isShowDialog;
      store.editTruelove = obj.truelove ? obj.truelove : null;
      console.log(store.editTruelove);
    },
    UPDATETRUELOVES(store, val) {
      store.trueloves = val;
    },
  },
  actions: {
  }
}

export default trueloveStore;