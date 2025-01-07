import { defineStore } from 'pinia'
import request from '@/utils/request'

export const orderStore = defineStore('order', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        createOrder(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/order/create',
                    method: 'POST',
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
        getOrderList(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/order',
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