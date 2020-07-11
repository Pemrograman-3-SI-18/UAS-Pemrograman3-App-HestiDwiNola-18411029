<template>
  <q-page padding class="items-center-justify-center bg-grey-3">
    <q-card flat class="bg-white q-pa-md">
      <span class="text-h5 text-weight-light q-pa-md">
        <span class="text-blue-grey-14">Tambah Data Beras</span>
      </span>
      <div class="q-pa-md">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >

          <q-input
            label="Kode Buku"
            lazy-rules
            color="teal"
            v-model="form.kodeBeras"
            :rules="[
           val => val !== null && val !== '' || 'Kode Beras Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="code"/>
            </template>
          </q-input>
          <q-input
            label="Merek Beras"
            lazy-rules
            color="teal"
            v-model="form.merekBeras"
            :rules="[
           val => val !== null && val !== '' || 'Merek Beras Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="title"/>
            </template>
          </q-input>
          <q-input
            label="Bobot Beras"
            lazy-rules
            color="teal"
            v-model="form.bobotBeras"
            :rules="[
           val => val !== null && val !== '' || 'Bobot Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="all_inbox"/>
            </template>
          </q-input>

          <q-input
            label="Distributor"
            lazy-rules
            color="teal"
            v-model="form.distributor"
            :rules="[
           val => val !== null && val !== '' || 'Distributor Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="nature_people"/>
            </template>
          </q-input>

          <q-input
          label="Tahun Produksi"
          lazy-rules
          color="teal"
          v-model="form.tahunProduksi"
          :rules="[
           val => val !== null && val !== '' || 'Tahun Produksi Dibutuhkan'
           ]">
          <template v-slot:append>
            <q-icon name="calendar_today"/>
          </template>
        </q-input>

          <q-input
            label="Harga Beras"
            lazy-rules
            color="teal"
            v-model="form.hargaBeras"
            :rules="[
           val => val !== null && val !== '' || 'Harga Beras Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="attach_money"/>
            </template>
          </q-input>

          <q-img :src="baseUrl + this.gambar" style="width: 250px; height: 250px"/>
          <q-toggle v-model="gangtiGambar" label="Ganti Gambar ?" />
          <q-input
            lazy-rules
            hint="Pilih gambar"
            type="file"
            ref="file"
            v-if="gangtiGambar == true"
            @input="selectFile()"
            color="teal"
            :rules="[
           val => val !== null && val !== '' || 'Gambar Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="add_photo_alternate"/>
            </template>
          </q-input>

          <div>
            <q-btn
              unelevated
              icon="add"
              label="Ubah Data Beras"
              style="height: 50px"
              type="submit"
              color="teal-6"/>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
    export default {
      name: "EditdataBeras",

      data() {
        return {
          gangtiGambar: false,
          baseUrl: 'http://localhost:5050/gambar/',
          form: {
            merekBeras: null,
            kodeBeras: null,
            bobotBeras: null,
            distributor: null,
            tahunProduksi: null,
            hargaBeras: null
          },
          id: null,
          gambar: null
        }
      },

      methods: {
        selectFile() {
          this.gambar = this.$refs.file.$refs.input.files[0]
        },
        onSubmit() {
          const formData = new FormData()
          formData.append('gambar', this.gambar)
          formData.append('merekBeras', this.form.merekBeras)
          formData.append('kodeBeras', this.form.kodeBeras)
          formData.append('bobotBeras', this.form.bobotBeras)
          formData.append('distributor', this.form.distributor)
          formData.append('tahunProduksi', this.form.tahunProduksi)
          formData.append('hargaBeras', this.form.hargaBeras)
          this.$axios.put('/beras/ubah/' + this.id, formData)
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
        },
        getDataBerasById() {
          this.$axios.get('/beras/databeras/' + this.$route.params.id)
            .then((res) => {
              this.data = res.data.data
              this.form.kodeBeras = this.data.kodeBeras
              this.form.merekBeras = this.data.merekBeras
              this.form.bobotBeras = this.data.bobotBeras
              this.form.distributor = this.data.distributor
              this.form.tahunProduksi = this.data.tahunProduksi
              this.form.hargaBeras = this.data.hargaBeras
              this.gambar = this.data.gambar
              this.id = this.data._id
            })
        }
        },
        mounted() {
          this.getDataBerasById()
        }
      }
</script>

<style scoped>

</style>
