<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page padding class="items-center-justify-center bg-grey-3">
    <q-toolbar-title class="absolute-top1">
      <div class="text-teal">
        <div class="text-weight-bold">
          <marquee direction="right" scollamount="14" align="center"> SELAMAT DATANG DI TOKO BERAS ATAYA</marquee>
        </div>
      </div>
    </q-toolbar-title>
    <!--Form input-->
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
            label="Kode Beras"
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
            label="Bobot"
            lazy-rules
            color="teal"
            v-model="form.bobotBeras"
            :rules="[
           val => val !== null && val !== '' || 'Bobot Beras Dibutuhkan'
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
           val => val !== null && val !== '' || 'Distributor Beras Dibutuhkan'
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

          <q-input
            lazy-rules
            hint="Pilih gambar"
            type="file"
            ref="file"
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
              type="submit"
              label="Tambah Data Barang"
              style="height: 50px"
              color="teal-6"/>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        merekBeras: null,
        kodeBeras: null,
        bobotBeras: null,
        distributor: null,
        tahunProduksi: null,
        hargaBeras: null
      },
      gambar: null
    }
  },
  methods: {
    selectFile() {
      this.gambar = this.$refs.file.$refs.input.files[0]
    },

    onSubmit () {
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
  }
}
</script>

<style scoped>

</style>
