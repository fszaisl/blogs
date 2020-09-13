import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home';
import Login from '../pages/login';
import Regiter from '../pages/register';
// import NotFound from '../pages/notfound';
import BolgList from '../pages/bloglist.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'list',
        component: BolgList,
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/regiter',
    name: 'regiter',
    component: Regiter
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
