import axios from "axios"
import { setLogin } from "../reducers/loginReducers"

const refreshUrl = "http://localhost:3001/api/refresh"

let store;
export const injectStore = _store => {
  store = _store
}

const authInstance = axios.create();

authInstance.interceptors.request.use((request) => {
  let token = "";

  if (store.getState().login) {
    token = store.getState().login.token;
  }

  request.headers.Authorization = "bearer " + token;

  return request;
}, (error) => {
  return Promise.reject(error);
});

authInstance.interceptors.response.use(async (response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error && error.response && error.response.data.error && error.response.data.error === "expired token") {
    try {
      const res = await axios.get(refreshUrl);
      store.dispatch(setLogin(res.data));
      //return res;
      return authInstance(originalRequest);
    } catch (err) {
      window.location = "/login"
      return Promise.reject(err);
    }
  }

  return Promise.reject(error);
})

export default authInstance;
