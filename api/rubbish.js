import request from '@/utils/request'
import auth from '@/utils/auth'
const group_name = 'rubbish'
const api_name = 'rubbish'

export default{
    search(page, size, searchMap){
        return request({
            url: `/${group_name}/${api_name}/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    },

    findByName(queryString){
        return request({
            url: `/${group_name}/${api_name}/name/${queryString}`,
            method: 'get',
        })
    },

    // 修改垃圾状态
    changeStateById(id,state){
        return request({
            url: `/${group_name}/${api_name}/${id}/${state}`,
            method: 'put'
        })
    },

    changeRubbish(id,data){
        return request({
            url: `/${group_name}/${api_name}/${id}`,
            method: 'put',
            data: data
        })
    },

    UploadFile(file){
        return request({
            url: `/${group_name}/${api_name}/uploadPictures`,
            method: 'post',
            data: file,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    addRubbish(data){
        return request({
            url: `/${group_name}/${api_name}`,
            method: 'post',
            data:data,
            headers: {
                'User-Token': auth.getUser().token
            }
        })
    }
}