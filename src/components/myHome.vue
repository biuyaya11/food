<template>
  <div class="home">
    <Header/>
    <el-container class="content">
      <Menu/>
      <el-container>
        <el-main>
          <Breadcrumb/>
          <div class="cont">
            <router-view></router-view>
          </div>

        </el-main>
        <el-footer><Footer/></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Menu from "@/components/common/Menu";
import Breadcrumb from "@/components/common/Breadcrumb";
export default {
    components: {
      Header,
      Footer,
      Menu,
      Breadcrumb,
    },
    data() {
      return{}
    }
}
</script>

<style lang="less" >
.home {
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
    .cont {
      margin: 20px 0;
    }
  }
}
</style>