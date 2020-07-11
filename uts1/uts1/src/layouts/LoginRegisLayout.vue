<template>
  <q-layout view="hHh Lpr lFf">
    <q-toolbar-title class="absolute-top1">
      <div class="text-teal">
        <div class="text-weight-bold">
          <marquee direction="right" scollamount="14" align="center"> SELAMAT DATANG DI TOKO BERAS ATAYA</marquee>
        </div>
      </div>
    </q-toolbar-title>
    <q-toolbar-title class="absolute-top1">
      <div class="text-yellow">
        <div class="text-weight-bold">
          <marquee direction="left" scollamount="12" align="center"> SELAMAT BERBELANJAAA!!!!!</marquee>
        </div>
      </div>
    </q-toolbar-title>
    <q-toolbar-title class="absolute-top-1">
      <div class="text-red">
        <div class="text-weight-bold">
          <marquee direction="up" scollamount="14" align="center"> SILAHKAN LOGIN/REGISTRASI TERLEBIH DAHULU(0_0)</marquee>
        </div>
      </div>
    </q-toolbar-title>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>
