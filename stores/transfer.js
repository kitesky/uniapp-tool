import { defineStore } from 'pinia'
import request from '@/utils/request'

export const transferStore = defineStore('transfer', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        getTransferList(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/transfer',
                    method: 'GET',
					data: params,
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