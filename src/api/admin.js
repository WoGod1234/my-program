import request from "@/router/request";


const baseUrl = '/api'
const API = {

    userInfo: () => {
        return request({
            url: baseUrl,
            method: 'get',
        })
    },
    addUser: (data) => {
        return request({
            url: baseUrl + '/add',
            method: 'post',
            data: data
        })
    },
    updateUser: (data) => {
        return request({
            url: baseUrl + '/update',
            method: 'post',
            data: data
        })
    },
    delUser: (params) => {
        return request({
            url: baseUrl + '/del',
            method: 'get',
            params: params
        })
    }
}
export default API