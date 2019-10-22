import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Map from './views/Map'
import MapShow from './views/MapShow'
import PointCreate from './views/PointCreate'
import PointEdit from './views/PointEdit'

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
      path: '/mapshow',
      name: 'mapshow',
      component: MapShow
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
  ]
})


