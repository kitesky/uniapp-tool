import { defineStore } from 'pinia'
import request from '../utils/request'

export const searchStore = defineStore('search', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        getSearchList() {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/search',
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