import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Map from './views/Map'
import PointCreate from './views/PointCreate'

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
    },
 
    {
      path: '/pointcreate',
      name: 'pointcreate',
      component: PointCreate
    }

    
  ]
})


