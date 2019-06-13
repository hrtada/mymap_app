import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Map from './views/Map'
import PointCreate from './views/PointCreate'
import PointEdit from './views/PointEdit'
import Pictuer from './views/Picture'

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
    },
    {
    path: '/pointedit',
    name: 'pointedit',
    component: PointEdit
    },
    {
      path: '/picture',
      name: 'picture',
      component: Pictuer
    }

    
  ]
})


