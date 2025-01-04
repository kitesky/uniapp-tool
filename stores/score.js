import { defineStore } from 'pinia'
import request from '@/utils/request'

export const scoreStore = defineStore('score', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        getScoreList(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/score',
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