<template>
  <div class="extract">
    <el-row>
      <el-col :span="8"
        ><el-button type="primary" @click="CHANGEEXTRACTDIALOGVISIBLE(true)"
          >摘句子</el-button
        ></el-col
      >
      <el-col :span="8">
        <el-input
          placeholder="请输入句子、作者、来源进行搜索"
          class="input-search"
          v-model="keyWord"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="extracts"
      border
      style="width: 100%"
      :row-style="{ height: '80px' }"
    >
      <el-table-column type="selection" width="59" align="center">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="150" align="center">
      </el-table-column>
      <el-table-column
        prop="extract"
        label="句子"
        width="330"
        header-align="center"
      >
      </el-table-column>
      <el-table-column prop="source" label="来源" width="150" align="center">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="270"
        header-align="center"
      >
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm
            title="您确定要删除吗？"
            @confirm="delExtract(scope.row._id)"
          >
            <el-button type="text" size="small" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next"> </el-pagination>
    <ExtractDialog></ExtractDialog>
  </div>
</template>

<script>
// 引入ExtractDialog组件
import ExtractDialog from "../components/ExtractDialog";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Extract",
  // 注册组件
  components: { ExtractDialog },
  data() {
    return {
      // 保存搜索关键词
      keyWord: "",
      showExtracts: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2022-05-03",
          extract:
            "不管前方的路有多苦，只要走的方向正确，不管多么崎岖不平，都比站在原地更接近幸福。",
          source: "《千与千寻》",
          author: "宫崎骏",
          remark: "",
        },
      ],
    };
  },
  computed: {
    ...mapState("extractStore", ["extractDialogVisible", "extracts"]),
  },
  methods: {
    ...mapMutations("extractStore", ["CHANGEEXTRACTDIALOGVISIBLE"]),
    ...mapActions("extractStore", ["getExtractList", "delExtract"]),
  },
  mounted() {
    // 获取列表
    this.getExtractList();
  },
};
</script>

<style lang="less">
.extract {
  .el-input {
    width: 400px;
  }
  .el-table {
    margin-top: 20px;
    .cell {
      white-space: pre-wrap;
    }
  }
  .el-pagination {
    margin-top: 20px;
    float: right;
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>