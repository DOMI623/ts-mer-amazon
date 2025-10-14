import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.MODE === 'development'
           ? 'http://localhost:4000' // 👈 coincide con tu backend
           : '/',
  headers: {
    'Content-type': 'application/json',
  },
});

 apiClient.interceptors.request.use(
     async (config) => {
       if (localStorage.getItem('userInfo'))
         config.headers.authorization = `Bearer ${
           JSON.parse(localStorage.getItem('userInfo')!).token
         }`

       return config
     },
    (error) => {
       Promise.reject(error)
     })
