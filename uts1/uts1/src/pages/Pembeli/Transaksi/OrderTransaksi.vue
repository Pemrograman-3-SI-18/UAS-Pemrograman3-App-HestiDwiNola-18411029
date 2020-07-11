<template>
  <q-page padding>
    <div class="q-mb-xl">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        autoplay
        arrows
        swipeable
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-md-3 col-xs-12" v-for="(beras, i) in data" :key="i">
        <q-card>
          <q-img
            :src="`${$baseImageURL}/${beras.gambar}`"
            :ratio="16/9"
          />
          <q-card-section>
            <q-btn
              fab
              color="red"
              icon="add_shopping_cart"
              class="absolute"
              unelevated
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                {{ beras.merekBeras }}
              </div>
            </div>

            <q-rating v-model="beras.rating" readonly color="orange-5" :max="5" size="32px" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              Rp. {{ beras.hargaBeras }} ,-
            </div>
            <div @click="beras.expanded = !beras.expanded" class="text-caption text-grey cursor-pointer">
              Tampilkan deskripsi
            </div>
            <q-slide-transition>
              <div v-show="beras.expanded">
                <div class="text-grey text-caption">
                  {{ beras.deskripsi }}
                </div>
              </div>
            </q-slide-transition>
          </q-card-section>

          <q-card-actions>
            <q-btn unelevated @click="openDetail(beras)" class="full-width" color="primary">
              Order Now
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog" v-if="dialog" position="bottom">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">Detail Pemesanan</div>
        </q-card-section>
        <q-card-section style="max-height: 50vh" class="scroll">
          {{ activeData.merekBeras }} - {{ activeData.hargaBeras}}
          <q-form class="q-mt-md">
            <q-input filled type="number" class="q-mb-md" v-model="jumlah" label="Masukan Jumlah"/>
            Rp. {{ total }} ,-
            <q-file color="teal" class="q-mt-md" filled v-model="gambar" label="Label">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Batal" v-close-popup/>
          <q-btn color="primary" @click="prosesTransaksi()" label="Proses"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
  export default {
    data () {
      return {
        slide: 1,
        stars: 4,
        dialog: false,
        gambar: null,
        data: [],
        activeData: null,
        jumlah: 1
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$axios.get('beras/databeras')
          .then(res => {
            if (res.data.sukses) {
              this.data = res.data.data.map(beras => {
                return Object.assign(beras, {
                  expanded: false
                })
              })
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
      },
      openDetail (data) {
        this.activeData = data
        this.dialog = true
      },
      prosesTransaksi () {
        const formData = new FormData()
        formData.append('gambar', this.gambar)
        formData.append('merekBeras', this.form.merekBeras)
        formData.append('kodeBeras', this.form.kodeBeras)
        formData.append('bobotBeras', this.form.bobotBeras)
        formData.append('distributor', this.form.distributor)
        formData.append('tahunProduksi', this.form.tahunProduksi)
        formData.append('hargaBeras', this.form.hargaBeras)
        this.$axios.post('/beras/input', formData)
          .then((res) => {
            if (res.data.error) {
              this.$q.notify({
                color: 'negative',
                message: res.data.msg,
                icon: 'ion-close'
              })
            } else {
              this.$q.notify({
                color: 'positive',
                message: res.data.msg,
                icon: 'ion-close'
              })
              this.$router.push('/')
            }
          })
      }
    },
    computed: {
      total () {
        return this.activeData.hargaBeras * this.jumlah
      }
    }
  }
</script>
