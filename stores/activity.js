import { defineStore } from 'pinia'
import request from '@/utils/request'

export const activityStore = defineStore('activity', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        getActivityList(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/activity',
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
        getActivity(id) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/activity/' + id,
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