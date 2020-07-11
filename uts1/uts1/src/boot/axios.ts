import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5050/'

})

// eslint-disable-next-line @typescript-eslint/require-await,@typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/require-await
export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
export { axiosInstance }
