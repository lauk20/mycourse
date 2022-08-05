import axios from "axios"
import store from "../store"
//should set Authorization header
axios.interceptors.request.use((config) => {
  const state = store.getState();
  return config;
}, (error) => {
  return Promise.reject(error);
});
