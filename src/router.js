import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Map from './views/Map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    }
  ]
})


