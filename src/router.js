import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Main from './views/Main'
// import Map from './views/Map'
//import MapShow from './views/MapShow'
import PointCreate from './views/PointCreate'
import PointEdit from './views/PointEdit'
import LabelMnt from './views/LabelMnt'
//import Pictuer from './views/Picture'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "main",
      component: Main
    },
    /*     {
      path: '/mapshow',
      name: 'mapshow',
      component: MapShow
    }, */
    {
      path: "/pointcreate",
      name: "pointcreate",
      component: PointCreate
    },
    {
      path: "/pointedit",
      name: "pointedit",
      component: PointEdit
    },
    /*    {
       path: '/picture',
      name: 'picture',
      component: Pictuer
    }, */
    {
      path: "/labelmnt",
      name: "labelmnt",
      component: LabelMnt
    }
  ]
});


