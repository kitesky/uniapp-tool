import { defineStore } from 'pinia'
import request from '@/utils/request'

export const productStore = defineStore('product', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        getProductList(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/product',
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