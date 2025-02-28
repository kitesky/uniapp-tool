import { defineStore } from 'pinia'
import request from '../utils/request'

export const homeStore = defineStore('home', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        homeData() {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/home',
                    method: 'GET',
                    success: (res) => {
                        resolve(res.data)
                    },
                    fail: (error) => {
                        reject(error)
                    }
                })
            })
        },
    },
})