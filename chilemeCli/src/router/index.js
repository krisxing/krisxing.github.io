import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/page/Login'
import Pos from '@/components/page/Pos'
import Reg from '@/components/page/Reg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/pos',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    }
  ]
})
