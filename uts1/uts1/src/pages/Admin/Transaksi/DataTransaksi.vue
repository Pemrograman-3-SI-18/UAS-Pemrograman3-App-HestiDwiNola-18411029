<template>
  <q-page>
    <q-toolbar-title class="absolute-top1">
      <div class="text-teal">
        <div class="text-weight-bold">
          <marquee direction="left" scollamount="14" align="center"> SELAMAT DATANG DI TOKO BERAS ATAYA!!! ADMIN SEMANGATTT</marquee>
        </div>
      </div>
    </q-toolbar-title>
    <!--Form input-->
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
          <!-- <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" /> -->
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
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
        { name: 'namaPem', align: 'center', label: 'Nama Pembeli', field: 'namaPem', sortable: true },
        { name: 'merekberas', align: 'center', label: 'Merek Beras', field: 'merekberas', sortable: true },
        { name: 'hargaberas', align: 'center', label: 'Harga Beras', field: 'hargaberas', sortable: true },
        { name: 'jumbel', label: 'Jumlah Beli', align: 'center', field: 'jumbel' },
        { name: 'total', label: 'Total', align: 'center', field: 'total' }
      ],
      data: [
        {
          kodeTr: 'TR--001',
          namaPem: 'Nola Camelia',
          merekberas: 'SJ 10 KG',
          hargaberas: 135.000,
          jumbel: 2,
          total: 270.000
        },
        {
          kodeTr: 'TR--002',
          namaPem: 'Jennie',
          merekberas: 'SJ 5 KG',
          hargaberas: 70.000,
          jumbel: 3,
          total: 210.000
        },
        {
          kodeTr: 'TR--003',
          namaPem: 'People',
          merekberas: 'SJ 25 KG',
          hargaberas: 330.000,
          jumbel: 2,
          total: 670.000
        },
        {
          kodeTr: 'BR--004',
          namaPem: 'SEHUN',
          merekberas: 'SJ 10 KG',
          hargaberas: 135.000,
          jumbel: 1,
          total: 135.000
        },
        {
          kodeTr: 'BR--005',
          namaPem: 'Jungkook',
          merekberas: 'SJ 5 KG',
          hargaberas: 70.000,
          jumbel: 5,
          total: 350.000
        }
      ]
    }
  },

  methods: {
    // emulate fetching data from server
    addRow () {
      this.loading = true
      setTimeout(() => {
        const
          index = Math.floor(Math.random() * (this.data.length + 1)),
          row = this.original[Math.floor(Math.random() * this.original.length)]
        if (this.data.length === 0) {
          this.rowCount = 0
        }
        row.id = ++this.rowCount
        const addRow = { ...row } // extend({}, row, { name: `${row.name} (${row.__count})` })
        this.data = [...this.data.slice(0, index), addRow, ...this.data.slice(index)]
        this.loading = false
      }, 500)
    },

    removeRow () {
      this.loading = true
      setTimeout(() => {
        const index = Math.floor(Math.random() * this.data.length)
        this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)]
        this.loading = false
      }, 500)
    }
  }
}
</script>
