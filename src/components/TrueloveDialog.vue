<template>
  <div class="trueloveDialog">
    <el-dialog
      :title="trueloveForm._id ? '编辑书籍' : '新增书籍'"
      :visible="trueloveDialogVisible"
      width="600px"
      top="0px"
      @close="closeTrueloveDialog('trueloveForm')"
      v-if="trueloveDialogVisible"
      destroy-on-close
    >
      <el-form
        ref="trueloveForm"
        :model="trueloveForm"
        label-width="80px"
        :rules="trueloveRules"
      >
        <el-form-item label="文名：" prop="title">
          <el-input v-model.trim="trueloveForm.title"></el-input>
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-input v-model.trim="trueloveForm.author"></el-input>
        </el-form-item>
        <el-form-item label="主角：" prop="protagonist">
          <el-input v-model.trim="trueloveForm.protagonist"></el-input>
        </el-form-item>
        <el-form-item label="首发：" prop="firstPublish">
          <el-input v-model.trim="trueloveForm.firstPublish"></el-input>
        </el-form-item>
        <el-form-item label="文案：" prop="copyWriting">
          <el-input
            type="textarea"
            v-model="trueloveForm.copyWriting"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item label="标签：" prop="tags">
          <el-checkbox-group v-model="trueloveForm.tags">
            <el-checkbox
              v-for="(tag, index) in tags"
              :key="index"
              :label="tag"
              :name="tag"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="fromButton">
          <el-button type="primary" @click="onSubmit('trueloveForm')"
            >提交</el-button
          >
          <el-button @click="closeTrueloveDialog('trueloveForm')"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// 引入Message
import Message from "../utils/message";
// 引入request
import request from "../utils/request";

const tags = [
  "爽文",
  "惊悚",
  "悬疑",
  "末世",
  "科幻",
  "星际",
  "哨兵向导",
  "电竞",
  "娱乐圈",
  "种田",
  "校园",
  "暗恋",
  "破镜重圆",
  "权谋",
  "无限流",
  "快穿",
  "穿书",
  "病娇",
  "强强",
  "直掰弯",
  "ABO",
];

export default {
  name: "TrueloveDialog",
  data() {
    return {
      // 是否给上传框的父级追加hide类名
      // 表单校验规则
      trueloveRules: {
        title: [
          { required: true, message: "输入文名不能为空", trigger: "blur" },
        ],
        author: [
          { required: true, message: "输入作者不能为空", trigger: "blur" },
        ],
      },
      tags,
    };
  },
  computed: {
    ...mapState("trueloveStore", ["trueloveDialogVisible", "trueloveForm"]),
  },
  methods: {
    ...mapMutations("trueloveStore", [
      "CHANGETRUELOVEDIALOGVISIBLE",
      "UPDATETRUELOVES",
    ]),
    // 表单提交的回调
    onSubmit(refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          // 处理收集的表单数据，将文名加上双引号
          const truelove = { ...this.trueloveForm };
          if (
            truelove.title.charAt(0) !== "《" &&
            truelove.title.charAt(truelove.title.length - 1) !== "》"
          ) {
            truelove.title = "《" + truelove.title + "》";
          }
          // 发送请求
          if (truelove._id) {
            // 修改
            request.post("/editTruelove", { ...truelove }).then(
              (res) => {
                // 更新页面
                this.UPDATETRUELOVES(res.data.truelove);
                Message.scccess(res.data.message);
              },
              (err) => {
                Message.error(err.response.data);
              }
            );
          } else {
            // 增加
            request
              .post("/addTruelove", {
                ...truelove,
              })
              .then(
                (res) => {
                  // 更新页面
                  this.UPDATETRUELOVES(res.data.truelove);
                  Message.scccess(res.data.message);
                  console.log(res);
                },
                (err) => {
                  console.log(err);
                  Message.error(err.response.data);
                }
              );
          }
          // 关闭对话框
          this.closeTrueloveDialog(refName);
        }
      });
    },
    // 关闭对话框
    closeTrueloveDialog(refName) {
      // 关闭对话框时，清空表单
      this.$refs[refName].resetFields();
      this.CHANGETRUELOVEDIALOGVISIBLE({ isShowDialog: false });
    },
  },
  watch: {},
  updated() {
    console.log(this.editTruelove);
  },
};
</script>

<style lang="less">
.trueloveDialog {
  .el-form {
    .fromButton {
      .el-button {
        float: right;
        margin-left: 20px;
      }
    }
  }
}
.hide {
  .el-upload--picture-card {
    display: none;
  }
}
</style>