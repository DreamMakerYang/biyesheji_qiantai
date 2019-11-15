import request from '@/utils/request'
import auth from '@/utils/auth'
const group_name = 'dynamic'
const api_name = 'dynamic'
export default{
    search(page, size, searchMap){
        return request({
            url: `/${group_name}/${api_name}/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    },

    getDynamicById(id){
        return request({
            url: `/${group_name}/${api_name}/${id}`,
            method: 'get',
        })
    },

    // 该用户是否已经点赞过
    hasStar(id){
        return request({
            url: `/${group_name}/${api_name}/star/${id}`,
            method: 'get',
            headers: {
                'User-Token': auth.getUser().token
            }
        })
    },

    // 设置用户点赞（点赞或取消点赞）
    setStar(id,change){
        return request({
            url: `/${group_name}/${api_name}/star/${id}`,
            method: 'put',
            headers: {
                'User-Token': auth.getUser().token
            },
            data:{
                flag:change
            }
        })
    },

    changeById(form){
        return request({
            url: `/${group_name}/${api_name}/${form.id}`,
            method: 'put',
            data: form
        })
    },

    addComment(data,id){
        return request({
            url: `/${group_name}/${api_name}/comment`,
            method: 'post',
            data:{
                data,
                id
            },
            headers: {
                'User-Token': auth.getUser().token
            }
        })
    },

    getCommentById(id){
        return request({
            url: `/${group_name}/${api_name}/comment/${id}`,
            method: 'get'
        })
    },

    deleteCommentByIds(ids){
        return request({
            url: `/${group_name}/${api_name}/comment`,
            method: 'delete',
            data: ids
        })
    },

    // 修改动态状态
    changeStateById(id,state){
        return request({
            url: `/${group_name}/${api_name}/${id}/${state}`,
            method: 'put'
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

    addDynamic(data){
        return request({
            url: `/${group_name}/${api_name}`,
            method: 'post',
            data:data,
            headers: {
                'User-Token': auth.getUser().token
            }
        })
    },

    getImageById(id){
        return request({
            url: `/${group_name}/${api_name}/image/${id}`,
            method: 'get',
        })
    },
}
