import { defineStore } from 'pinia'
import request from '../utils/request'

export const taskStore = defineStore('task', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        task(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/task',
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
		checkIn() {
		    return new Promise((resolve, reject) => {
		        request.send({
		            url: '/check-in',
		            method: 'POST',
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