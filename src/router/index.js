import Vue from 'vue'
import Router from 'vue-router'
import Home from '../view/home.vue'
import MyInfo from '../view/myInfo.vue'
import Login from '../view/login.vue'

import countsView from '../view/countsView.vue'

// 管理后台页面
import AdminList from '../view/adminList.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: '首页', type: 'login' }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: '登录' }
    },
    {
      path: '/myinfo',
      name: 'MyInfo',
      component: MyInfo,
      meta: { title: '我的', type: 'login' }
    },
    {
      path: '/myinfo/player',
      name: 'Home',
      component: Home,
      meta: { title: '选手页', type: 'login' }
    },
    {
      path: '/myinfo/judges',
      name: 'Home',
      component: Home,
      meta: { title: '评委页', type: 'login' }
    },
    {
      path: '/myinfo/countsView',
      name: 'countsView',
      component: countsView,
      meta: { title: '评分页', type: 'login' }
    },
    {
      path: '/admin-list',
      name: 'AdminList',
      component: AdminList,
      meta: { title: '管理后台页面', type: 'login' }
    },
  ]
})
