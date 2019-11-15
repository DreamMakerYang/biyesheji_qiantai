import request from '@/utils/request'
const group_name = 'user'
const api_name = 'user'
export default{
    login(data){
        return request({
            url: `/${group_name}/${api_name}/login`,
            method: 'post',
            data: data
        })
    },

    register(data){
        return request({
            url: `/${group_name}/${api_name}/register`,
            method: 'post',
            data: data
        })
    },

    findUserCountByPhone(phone){
        return request({
            url: `/${group_name}/${api_name}/findUserCountByPhone/${phone}`,
            method: 'get'
        })
    },
}