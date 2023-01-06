<template>
  <div class="notfound">
    <div class="wrapper">
      <div class="big">页面不见了</div>
      <div>首页<router-link to="/">here</router-link>go</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {};
  },
};
</script>

<style scoped>
.notfound {
  height: 3000px;
  background-image: url("../assets/go.jpeg"),url("../assets/404.jpeg");
  background-position: center top, center center;
  background-repeat: no-repeat, repeat;
  background-size: auto, auto;
}
/*这里注意空格*/
.notfound .wrapper {
  position: absolute;
  color: red;
  width: 800px;
  font-size: 30px;
  line-height: 60px;
}
</style>