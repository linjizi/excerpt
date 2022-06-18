// 引入Message
import Message from "../utils/message";
// 引入request
import request from "../utils/request";

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
    // 获取列表
    getTrueloveList(context) {
      request
        .get("/getTrueloveList")
        .then((res) => {
          context.commit("UPDATETRUELOVES", res.data.truelove);
          Message.scccess(res.data.message);
        })
        .catch((err) => {
          Message.error(err.response.data);
        });
    },
    // 删除
    deleteTruelove(context, id) {
      request.get(`/deleteTruelove?id=${id}`).then(
        (res) => {
          context.commit("UPDATETRUELOVES", res.data.truelove);
          Message.scccess(res.data.message);
        },
        (err) => {
          Message.error(err.response.data);
          console.log(err);
        }
      );
    },
    // 查询
    searcTruelove(context, keyWord) {
      console.log(keyWord);
      request(`/searchTruelove?keyWord=${keyWord}`).then(
        (res) => {
          context.commit("UPDATETRUELOVES", res.data.truelove)
          Message.scccess(res.data.message);
        },
        (err) => {
          Message.error(res.response.data);
        }
      );
    },
    // 修改
    editTruelove(context, truelove) {
      request.post("/editTruelove", { ...truelove }).then(
        (res) => {
          // 更新页面
          context.commit("UPDATETRUELOVES", res.data.truelove);
          Message.scccess(res.data.message);
        },
        (err) => {
          Message.error(err.response.data);
        }
      );
    },
    // 增加
    addTruelove(context, truelove) {
      request
        .post("/addTruelove", {
          ...truelove,
        })
        .then(
          (res) => {
            // 更新页面
            context.commit("UPDATETRUELOVES", res.data.truelove);
            Message.scccess(res.data.message);
          },
          (err) => {
            Message.error(err.response.data);
          }
        );
    }
  }
}

export default trueloveStore;