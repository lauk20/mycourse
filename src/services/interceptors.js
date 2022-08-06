import axios from "axios"
//should set Authorization header
//https://blog.bitsrc.io/setting-up-axios-interceptors-for-all-http-calls-in-an-application-71bc2c636e4e
let store;

export const injectStore = _store => {
  store = _store
}

const authInstance = axios.create();

authInstance.interceptors.request.use((request) => {
  const token = store.getState().login.token;
  request.headers.Authorization = "bearer " + token;

  return request;
}, (error) => {
  return Promise.reject(error);
});

export default authInstance;
