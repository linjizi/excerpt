<template>
  <div>
    <el-container>
      <el-header height="55px">Header</el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu
            default-active="/extract"
            class="el-menu-vertical-demo"
            :router="true"
          >
            <el-submenu index="/bookrack">
              <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>书架管理</span>
              </template>
              <el-menu-item index="/bookrack/truelove">纯爱分类</el-menu-item>
              <el-menu-item index="/bookrack/other">其它分类</el-menu-item>
            </el-submenu>
            <el-menu-item index="/statistic">
              <!-- <i class="el-icon-document"></i> -->
              <span slot="title">阅读统计</span>
            </el-menu-item>
            <el-menu-item index="/extract">
              <!-- <i class="el-icon-document"></i> -->
              <span slot="title">句子控</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer height="55px">Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 50px;
  height: 50px;
}

.el-aside {
  // background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 600px;
  height: 600px;
}

.el-menu {
  // background-color: #d3dce6;
  height: 600px;
}
.el-main {
  position: relative;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>