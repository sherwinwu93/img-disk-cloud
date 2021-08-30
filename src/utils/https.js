import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

const BASE_URL = 'https://alonepluto.info/api/cloud/v1'
const SECRET_KEY = 'WIGDIOGR9V8B9R'

export function http(config) {
  let instance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000
  })
  instance.interceptors.request.use(config => {
    config.headers.SecretKey = SECRET_KEY
    if ("/login".test(config.url)) {
      return config;
    } else {
      config.headers.Authorization = store.state.token;
      return config;
    }
  }, err => {
    console.log(err);
  })
  instance.interceptors.response.use(res => {
    if (res.data.code === 805 || res.data.code === 806) {
      router.replace('/login');
    }
    return res;
  }, err => {
    console.log(err);
  });
  return instance(config);
}
