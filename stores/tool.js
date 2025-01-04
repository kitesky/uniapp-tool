import { defineStore } from 'pinia'
import request from '@/utils/request'

export const toolStore = defineStore('tool', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        getToolList(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/tool',
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
		getTool(id) {
		    return new Promise((resolve, reject) => {
		        request.send({
		            url: '/tool/' + id,
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