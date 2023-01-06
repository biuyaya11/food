import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path:'/',
        name:"首页",
        hidden:true,
        component: ()=>import('@/components/myLogin')
      },
    {
      path:'/home',
      name:"主页",
      hidden:true,
      component: ()=>import('@/components/myHome')
    },
    {
      path:'*',
      name:"404",
      hidden:true,
      component: ()=>import('@/components/NotFound')
    },
    {
      path:'/users',
      name:'用户管理',
      iconClass: 'el-icon-user',
      component: () => import('@/components/myHome'),
      children: [
        {
          path: '/users/user',
          name:'员工管理',
          iconClass: 'fa fa-user',
          component: () => import('@/components/users/user')
        },
      ]
    },
    {
      path:'/home',
      name:'菜品管理',
      iconClass: 'fa fa-users',
      redirect: '/home/dishMangement',
      component: () => import('@/components/myHome'),
      children: [
        {
          path: '/home/category',
          name:'分类管理',
          iconClass: 'fa fa-list',
          component: () => import('@/components/dish/category')
        },
        {
          path: '/home/dish',
          name:'菜品管理',
          iconClass: 'fa fa-list',
          component: () => import('@/components/dish/dishMange')
        },
        {
          path: '/home/order',
          name:'订单列表',
          iconClass: 'fa fa-list-alt',
          component: () => import('@/components/dish/orderList')
        },
      ]
    },
  ],
  mode: "history"
})