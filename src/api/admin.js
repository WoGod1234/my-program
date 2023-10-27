import request from "@/router/axios";

const API = {
    login: (data) => {
        return request({
            url: "/login",
            method: 'post',
            data:data
        })
    }
}
export default API