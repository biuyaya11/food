<template>
  <div class="header">
    <el-header>
      <div class="title">外卖管理系统</div>
      <div>{{name}}
        <el-button @click="loginOut" size="mini" type="danger">退出</el-button>
      </div>

    </el-header>
  </div>
</template>

<script>
import {getToken, removeToken} from "@/utils/setToken";
export default {
  data() {
    return {
      name: '',
    }
  },
  created() {
    this.name = getToken('username')
  },
  methods: {
    loginOut(){
      removeToken('username');
      removeToken('token');
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  .el-header {
    width: 100%;
    background: cadetblue;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    .title {
      width: 200px;
      font-size: 30px;
    }

  }
}
</style>