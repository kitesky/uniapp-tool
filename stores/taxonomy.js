import { defineStore } from 'pinia'
import request from '../utils/request'

export const taxonomyStore = defineStore('taxonomy', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        taxonomy(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/taxonomy',
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