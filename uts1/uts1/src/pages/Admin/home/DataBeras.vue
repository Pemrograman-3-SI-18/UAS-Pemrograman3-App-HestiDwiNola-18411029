<template>
  <q-page>
    <q-toolbar-title class="absolute-top1">
      <div class="text-teal">
        <div class="text-weight-bold">
          <marquee direction="right" scollamount="14" align="center"> SELAMAT DATANG DI TOKO BERAS ATAYA</marquee>
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
          <q-btn color="primary" :disable="loading" label="Tambah Data Beras" to="/inputdataberas"/>
          <!-- <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" /> -->
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="kodeBeras" :props="props">
              {{ props.row.kodeBeras }}
            </q-td>
            <q-td key="merekBeras" :props="props">{{ props.row.merekBeras }}</q-td>
            <q-td key="bobotBeras" :props="props">{{ props.row.bobotBeras }}</q-td>
            <q-td key="distributor" :props="props">{{ props.row.distributor }}</q-td>
            <q-td key="tahunProduksi" :props="props">{{ props.row.tahunProduksi }}</q-td>
            <q-td key="hargaBeras" :props="props">{{ props.row.hargaBeras }}</q-td>
            <q-td key="gambar" :props="props">
              <q-img :src="baseURL + props.row.gambar" style="width: 50px; height: 50px"/>
            </q-td>
            <q-td key="action" :props="props">

              <div class="justify-center q-gutter-x-xs">
                <q-btn color="teal"
                       dense size="sm"
                       class="q-px-xs"
                       icon="edit"
                       @click="edit(props.row.kodeBeras)"
                       label="Edit"></q-btn>
                <q-btn
                  color="red"
                  dense size="sm"
                  @click="hapusberas(props.row._id)"
                  class="q-px-xs"
                  icon="delete"
                  label="Hapus"></q-btn>
              </div>
            </q-td>
          </q-tr>
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
          name: 'kodeBeras',
          required: true,
          label: 'Kode Beras',
          align: 'left',
          field: row => row.kodeBeras,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'merekBeras', align: 'center', label: 'Merek Beras', field: 'merekBeras', sortable: true },
        { name: 'bobotBeras', align: 'center', label: 'Bobot', field: 'bobotBeras', sortable: true },
        { name: 'distributor', label: 'Distributor', align: 'center', field: 'distributor' },
        { name: 'tahunProduksi', label: 'Tahun Produksi', align: 'center', field: 'tahunProduksi' },
        { name: 'hargaBeras', label: 'Harga Beras', align: 'center', field: 'hargaBeras' },
        { name: 'gambar', label: 'Gambar', align: 'center', field: 'gambar' },
        { name: 'action', align: 'center', label: 'Action', field: 'action', sortable: true }
      ],
      data: []
    }
  },

  methods: {
    // emulate fetching data from server
    getDataBeras () {
      this.$axios.get('/beras/databeras')
        .then((res) => {
          this.data = res.data.data
        })
    },

    hapusberas (_id) {
      this.$axios.delete('/beras/hapus/' + _id)
        .then((res) => {
          this.$q.notify({
            color: 'positive',
            message: 'Berhasil Menghapus Data'
          })
          this.getDataBeras()
        })
    },

    edit (kodeBeras) {
      this.$router.push('/editdataberas/' + kodeBeras)
    }
  },
  mounted() {
    this.getDataBeras()
  }

}
</script>
