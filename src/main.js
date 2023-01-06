import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
import router from './router'
import service from "./service";


Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.service = service

//路由导航守卫
router.beforeEach((to,from,next) => {
  if (!localStorage.getItem('username')){
    if (to.path != '/login') {
      next('/login')
    } else next()
  } next()
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
