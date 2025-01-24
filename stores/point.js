import { defineStore } from 'pinia'
import request from '@/utils/request'

export const pointStore = defineStore('point', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        getPointList(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/point',
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