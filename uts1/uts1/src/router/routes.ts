import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta:{
      auth:true,
    },
    children: [
      { path: '', component: () => import('pages/Admin/home/DataBeras.vue') },
      { path: 'inputdataberas', component: () => import('pages/Admin/home/InputDataBeras.vue') },
      { path: 'editdataberas/:id', component: () => import('pages/Admin/home/EditdataBeras.vue') },
      { path: 'datatransaksi', component: () => import('pages/Admin/Transaksi/DataTransaksi.vue') }
    ]
  },
  {
    path: '/pembeli',
    component: () => import('layouts/PembeliLayout.vue'),
    meta:{
      auth:true,
    },
    children: [
      { path: '', component: () => import('pages/Pembeli/DataBeras/Databeras.vue') },
      { path: 'transaksi', component: () => import('pages/Pembeli/Transaksi/Datatransaksi.vue') },
      { path: 'order', component: () => import('pages/pembeli/Transaksi/OrderTransaksi.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/LoginRegisLayout.vue'),
    children: [
      { path: 'auth/login', component: () => import('pages/users/Login.vue') },
      { path: 'auth/registrasi', component: () => import('pages/users/Registrasi.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
