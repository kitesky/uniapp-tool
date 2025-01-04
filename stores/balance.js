import { defineStore } from 'pinia'
import request from '@/utils/request'

export const balanceStore = defineStore('balance', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        getBalanceList(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/balance',
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