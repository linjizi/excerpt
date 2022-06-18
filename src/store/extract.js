import { Message } from "element-ui";
import request from "../utils/request";

const extractStore = {
  namespaced: true,
  state: {
    extractDialogVisible: false,
    extracts: []
  },
  mutations: {
    CHANGEEXTRACTDIALOGVISIBLE(store, val) {
      store.extractDialogVisible = val;
    },
    UPDATEEXTRACTS(store, extracts) {
      store.extracts = extracts;
    }
  },
  actions: {
    // 添加
    addExtract(context, extract) {
      request.post("/addExtract", { ...extract }).then(res => {
        context.commit("UPDATEEXTRACTS", res.data.extract);
        Message.success(res.data.message);
      }, err => {
        Message.error(err.response.data);
      })
    },
    // 获取列表
    getExtractList(context) {
      request.get("/getExtractList").then(res => {
        context.commit("UPDATEEXTRACTS", res.data.extract);
        Message.success(res.data.message);
      }, err => {
        Message.error(err.response.data);
      })
    },
    // 删除
    delExtract(context, id) {
      request.get(`/delExtract?id=${id}`).then(res => {
        context.commit("UPDATEEXTRACTS", res.data.extract);
        Message.success(res.data.message);
      }, err => {
        Message.error(err.response.data);
      })
    }
  }
};

export default extractStore;