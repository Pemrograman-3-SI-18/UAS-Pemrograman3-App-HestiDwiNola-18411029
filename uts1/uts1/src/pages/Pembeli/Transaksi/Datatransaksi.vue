<template>
  <q-page>
    <q-toolbar-title class="absolute-top1">
      <div class="text-teal">
        <div class="text-weight-bold">
          <marquee direction="right" scollamount="14" align="center"> SELAMAT DATANG DI TOKO BERAS ATAYA</marquee>
        </div>
      </div>
    </q-toolbar-title>
    <!--form Transaksi -->
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="data"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >

        <template v-slot:top>
        <span class="text-h5 text-weight-light q-pa-md">
        <span class="text-blue-grey-14">Data Transaksi</span>
      </span>
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
              <div>
                <q-btn color="primary" :disable="loading" label="Tambah Belanjaan" to="/order"/>
              </div>
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      baseURL: 'http://localhost:5050/gambar/',

      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Kode Transaksi',
          align: 'left',
          field: row => row.kodeTr,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'userName', align: 'center', label: 'Username', field: 'userName', sortable: true },
        { name: 'namaLengkap', align: 'center', label: 'Nama Lengkap', field: 'namaLengkap', sortable: true },
        { name: 'merekberas', align: 'center', label: 'Merek Beras', field: 'merekberas', sortable: true },
        { name: 'hargaberas', align: 'center', label: 'Harga Beras', field: 'hargaberas', sortable: true },
        { name: 'jumbel', label: 'Jumlah Beli', align: 'center', field: 'jumbel' },
        { name: 'total', label: 'Total', align: 'center', field: 'total' }
      ],
      data: []
    }
  },

  methods: {
    // emulate fetching data from server
  }
}
</script>
