import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru/',
    withCredentials: true
})
