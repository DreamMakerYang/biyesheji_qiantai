import request from '@/utils/request'
import auth from '@/utils/auth'
const group_name = 'news'
const api_name = 'news'
export default{
    search(page, size, searchMap){
        return request({
            url: `/${group_name}/${api_name}/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    },
    
    saveKnow(data){
        return request({
            url: `/${group_name}/${api_name}/`,
            method: 'put',
            data: data
        })
    },

    deleteById(id){
        return request({
            url: `/${group_name}/${api_name}/${id}`,
            method: 'delete'
        })
    },

    // 修改动态状态
    changeStateById(id,state){
        return request({
            url: `/${group_name}/${api_name}/${id}/${state}`,
            method: 'put'
        })
    },

    // 根据id查询新闻内容
    getNewsById(id){
        return request({
            url: `/${group_name}/${api_name}/${id}`,
            method: 'get'
        })
    },

    // 修改新闻内容
    commitNewsContent(id,content){
        return request({
            url: `/${group_name}/${api_name}/${id}`,
            method: 'put',
            data: content
        })
    },
    
    setHot(id){
        return request({
            url: `/${group_name}/${api_name}/hot/${id}`,
            method: 'put',
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

    addNews(data){
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