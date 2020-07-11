<template>
  <q-page>
  <div/>
    <q-toolbar-title class="absolute-top1">
      <div class="text-teal">
        <div class="text-weight-bold">
          <marquee direction="right" scollamount="14" align="center"> SELAMAT DATANG DI TOKO BERAS ATAYA</marquee>
        </div>
      </div>
    </q-toolbar-title>

  <!-- Daftar Barang -->
    <div class="q-pa-md">
      <div class="row">
        <!-- Merek Beras 1 -->
        <div class="col-md-4 col-xs-14 q-pa-md" v-for="(beras, i) in data" :key="i">
          <q-card flat class="bg-white text-blue-grey-14">
            <q-card-section>
              <div class="text-h6">
                {{ beras.merekBeras }}
              </div>
            </q-card-section>
            <div>
            <q-card-section class="row items-center justify-center">
              <q-img spinner-color="white" style="height: 250px; max-width: 50%" :src="baseUrl + beras.gambar" />
            </q-card-section>
            </div>
            <q-card-section>
              <div>
                Harga: Rp. {{ beras.hargaBeras }}
              </div>
              <div>
                Bobot: {{ beras.bobotBeras }}
              </div>
              <div>
                Distributor: {{ beras.distributor }}
              </div>
            </q-card-section>
            <q-card-section>
<!--              COBA ORDER KERANJANG-->
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="kodeBeras" :props="props">
                    {{ props.row.kodeBeras }}
                  </q-td>
                </q-tr>
              </template>
              <q-btn color="teal"
                     icon="add_shopping_cart"
                     label="Tambah Ke Keranjang"
                     @click="edit(this.props.row.kodeBeras)" to="/order"></q-btn>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
</q-page>
</template>

<script>
export default {
  name: 'Databeras',
  data() {
    return {
      data: [],
      baseUrl: 'http://localhost:5050/gambar/'
    }
  },
  methods: {
    getDataBeras() {
      this.$axios.get('/beras/databeras')
        .then((res) => {
          this.data = res.data.data
        })
    },
  //tambah keranjang
  edit (kodeBeras) {
    this.$router.push('/order/' + kodeBeras)
  }
},
    mounted() {
      this.getDataBeras()
    }
}
</script>
