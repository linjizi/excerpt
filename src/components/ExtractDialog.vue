<template>
  <div class="extractDialog">
    <el-dialog
      title="收货地址"
      width="600px"
      :visible.sync="extractDialogVisible"
      @close="CHANGEEXTRACTDIALOGVISIBLE(false)"
    >
      <el-form
        ref="extractForm"
        :model="extractForm"
        label-width="80px"
        :rules="extractRules"
      >
        <el-form-item label="句子：" prop="extract">
          <el-input
            type="textarea"
            :rows="4"
            v-model="extractForm.extract"
          ></el-input>
        </el-form-item>
        <el-form-item label="来源：" prop="source">
          <el-input v-model.trim="extractForm.source"></el-input>
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-input v-model.trim="extractForm.author"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input
            type="textarea"
            :rows="4"
            v-model="extractForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CHANGEEXTRACTDIALOGVISIBLE(false)">取 消</el-button>
        <el-button type="primary" @click="onSubmit('extractForm')"
          >提 交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "ExtractDialog",
  data() {
    return {
      extractForm: {
        extract: "",
        source: "",
        author: "",
        remark: "",
      },
      extractRules: {
        extract: [
          { required: true, message: "输入句子不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapState("extractStore", ["extractDialogVisible"]),
  },
  methods: {
    ...mapMutations("extractStore", ["CHANGEEXTRACTDIALOGVISIBLE"]),
    ...mapActions("extractStore", ["addExtract"]),
    // 表单提交的回调
    onSubmit(refName) {
      // 校验
      this.$refs[refName].validate((valid) => {
        if (valid) {
          const extract = { ...this.extractForm };
          // 处理来源
          if (
            extract.source.charAt(0) !== "《" &&
            extract.source.charAt(extract.source.length - 1) !== "》"
          ) {
            extract.source = "《" + extract.source + "》";
          }
          console.log("前", extract);
          // 处理句子和备注开头和结束的换行符
          extract.extract = extract.extract.replace(
            /(^[\r\n]+)|(^\ +\n+)|(\s+$)/g,
            ""
          );
          extract.remark = extract.remark.replace(/(^[\r\n]+)|(\s+$)/g, "");
          console.log("后", extract);
          this.addExtract(extract);
          // 关闭对话框
          this.CHANGEEXTRACTDIALOGVISIBLE(false);
        }
      });
    },
  },
};
</script>

<style lang="less">
.extractDialog {
  .el-input {
    width: 400px;
  }
}
</style>