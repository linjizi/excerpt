<template>
  <div class="trueloveDialog">
    <el-dialog
      title="新增书籍"
      :visible="trueloveDialogVisible"
      width="600px"
      top="0px"
      @close="closeTrueloveDialog('trueloveForm')"
      v-if="trueloveDialogVisible"
      destroy-on-close
    >
      <el-form
        ref="trueloveForm"
        :model="editTruelove || trueloveForm"
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
        <el-form-item label="封面：" prop="cover">
          <el-upload
            action="none"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="hideUpload"
            :class="{ hide: isHideClass }"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
                @click="handlePictureCardPreview(file)"
              />
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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

export default {
  name: "TrueloveDialog",
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      // 是否给上传框的父级追加hide类名
      isHideClass: false,
      // 表单数据
      trueloveForm: {
        cover: "",
        title: "",
        author: "",
        protagonist: "",
        firstPublish: "",
        copyWriting: "",
      },
      // 表单校验规则
      trueloveRules: {
        title: [
          { required: true, message: "输入文名不能为空", trigger: "blur" },
        ],
        author: [
          { required: true, message: "输入作者不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapState("trueloveStore", ["trueloveDialogVisible", "editTruelove"]),
  },
  methods: {
    ...mapMutations("trueloveStore", [
      "CHANGETRUELOVEDIALOGVISIBLE",
      "UPDATETRUELOVES",
    ]),
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // Upload组件on-change的回调，选取文件后隐藏上传框
    hideUpload(file, fileList) {
      this.isHideClass = true;
      // 将图片路径存放在cover
      this.trueloveForm.cover = file.url;
    },
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
          // 关闭对话框
          this.closeTrueloveDialog(refName);
        }
      });
    },
    closeTrueloveDialog(refName) {
      // 关闭对话框时，清空表单
      this.$refs[refName].resetFields();
      this.CHANGETRUELOVEDIALOGVISIBLE({ isShowDialog: false });
    },
  },
  watch: {},
  mounted() {
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