import { defineStore } from 'pinia'
import request from '../utils/request'

export const userStore = defineStore('user', {
    state: () => {
        return { 
            count: 11,
            token: '' 
        }
    },
    getters: {
        getToken() {
            return uni.getStorageSync('token')
        },
        user() {
            return uni.getStorageSync('user')
        }
    },
    actions: {
        increment() {
            this.count++
        },
        // 更新用户信息
        setProfile(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/user/profile',
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
        // 微信小程序登录
        wxLogin(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/wechat/login',
                    method: 'POST',
                    data: params,
                    success: (res) => {
                        uni.setStorageSync('token',  res.data.data.access_token)
                        resolve(res.data)
                    },
                    fail: (error) => {
                        reject(error)
                    }
                })
            })
        },
        // 获取用户信息
        userInfo(params) {
            return new Promise((resolve, reject) => {
                request.send({
                    url: '/user/info',
                    method: 'GET',
                    data: params,
                    success: (res) => {
                        uni.setStorageSync('user',  res.data.data)
                        resolve(res.data)
                    },
                    fail: (error) => {
                        reject(error)
                    }
                })
            })
        },
        // 退出登录
        logout() {
            try {
                uni.removeStorageSync('token')
                uni.removeStorageSync('user')
                uni.removeStorageSync('searchHistoryKeywords')
                uni.clearStorageSync()
                uni.reLaunch({
                    url: '/pages/auth/login'
                });
            } catch (e) {
                console.log(e)
            }
        }

    },
})