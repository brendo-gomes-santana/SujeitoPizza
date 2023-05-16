import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://172.20.12.187:3333'
})