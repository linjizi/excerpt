<template>
  <div class="truelove">
    <el-row>
      <el-col :span="8"
        ><el-button
          type="primary"
          @click="CHANGETRUELOVEDIALOGVISIBLE({ isShowDialog: true })"
          >新增书籍</el-button
        ></el-col
      >
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          class="input-search"
          v-model="keyWord"
          @keyup.enter.native="searcTruelove"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searcTruelove"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="showTrueloves"
      border
      style="width: 100%"
      :row-style="{ height: '128px' }"
    >
      <el-table-column type="selection" width="59" align="center">
      </el-table-column>
      <el-table-column prop="title" label="文名" width="150" align="center">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="protagonist"
        label="主角"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="firstPublish"
        label="首发"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="tags" label="标签" width="120" align="center">
        <template slot-scope="scope">
          <el-tag
            v-for="(tag, index) in scope.row.tags"
            :key="index"
            disable-transitions
            size="mini"
            >{{ tag }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="copyWriting"
        label="文案"
        width="380"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-popover
            placement="top"
            title="文案"
            width="400"
            trigger="hover"
            :content="scope.row.copyWriting"
          >
            <div slot="reference" class="copyWritingColumn">
              {{ scope.row.copyWriting }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="
              CHANGETRUELOVEDIALOGVISIBLE({
                isShowDialog: true,
                truelove: scope.row,
              })
            "
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm
            title="您确定要删除吗？"
            @confirm="deleteTruelove(scope.row._id)"
          >
            <el-button type="text" size="small" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="trueloves ? trueloves.length : 0"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      @prev-click="currentPage - 1"
      @next-click="currentPage + 1"
    >
    </el-pagination>

    <TrueloveDialog></TrueloveDialog>
  </div>
</template>

<script>
import TrueloveDialog from "../components/TrueloveDialog";
import { mapState, mapMutations } from "vuex";
import request from "../utils/request";
import Message from "../utils/message";

export default {
  name: "Truelove",
  components: { TrueloveDialog },
  data() {
    return {
      // 每页显示条目个数
      pageSize: 3,
      currentPage: 1,
      // 保存搜索输入框的关键词
      keyWord: "",
    };
  },
  computed: {
    ...mapState("trueloveStore", ["trueloveFormVisible", "trueloves"]),
    showTrueloves() {
      // 截取出当前表格页码数需显示的数据
      const begin = (this.currentPage - 1) * this.pageSize;
      return this.trueloves?.slice(begin, begin + this.pageSize);
    },
  },
  methods: {
    ...mapMutations("trueloveStore", [
      "CHANGETRUELOVEDIALOGVISIBLE",
      "UPDATETRUELOVES",
    ]),
    // 跳转至当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 删除
    deleteTruelove(id) {
      request.get(`/deleteTruelove?id=${id}`).then(
        (res) => {
          this.UPDATETRUELOVES(res.data.truelove);
          Message.scccess(res.data.message);
        },
        (err) => {
          Message.error(err.response.data);
          console.log(err);
        }
      );
    },
    // 查询
    searcTruelove() {
      console.log(this.keyWord);
      request(`/searchTruelove?keyWord=${this.keyWord}`).then(
        (res) => {
          console.log(res);
          this.UPDATETRUELOVES(res.data.truelove);
          Message.scccess(res.data.message);
        },
        (err) => {
          console.log(err);
          Message.error(res.response.data);
        }
      );
    },
  },
  // mounted钩子
  mounted() {
    // 组件挂载时获取数据库中的数据
    request
      .get("/getTrueloveList")
      .then((res) => {
        this.UPDATETRUELOVES(res.data.truelove);
        Message.scccess(res.data.message);
      })
      .catch((err) => {
        Message.error(err.response.data);
      });
  },
};
</script>

<style lang="less">
.truelove {
  .el-input {
    width: 400px;
  }
  .el-table {
    margin-top: 20px;
    .copyWritingColumn {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .cell {
      white-space: pre-wrap;
    }
    .el-tag {
      margin-right: 5px;
    }
  }
  .el-pagination {
    margin-top: 20px;
    float: right;
    position: absolute;
    bottom: 30px;
    right: 20px;
  }
}
.el-popover {
  white-space: pre-wrap;
}
</style>