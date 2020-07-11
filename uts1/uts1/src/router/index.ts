import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import {LocalStorage, Notify} from 'quasar'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

Vue.use(VueRouter)

export default function () {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.auth)) {
    if(localStorage.getItem('datauser') === null || localStorage.getItem('datauser') === undefined){
      next( {
        path: '/auth/login'
      })

      Notify.create({
        icon: 'ion-close',
        color: 'negative',
        message: 'Anda Belum Login',
        actions: [{ icon: 'close', color: 'white'}]

      })
    } else {
      next()
    }

  } else {
    next()
    }
  })
  return Router
}
