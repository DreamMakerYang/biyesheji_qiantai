import request from '@/utils/request'
const group_name = 'setting'
const api_name = 'setting'
export default{
    getPicture(){
        return request({
            url: `/${group_name}/${api_name}/picture`,
            method: 'get',
        })
    },

    getHotAttention(){
        return request({
            url: `/${group_name}/${api_name}/attention`,
            method: 'get',
        })
    },

    getHotNews(){
        return request({
            url: `/${group_name}/${api_name}/news`,
            method: 'get',
        })
    },
}