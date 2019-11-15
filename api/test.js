import request from '@/utils/request'
const group_name = 'setting'
const api_name = 'setting'
export default{
    UploadFile(file){
        return request({
            url: `/${group_name}/${api_name}/uploadPictures`,
            method: 'post',
            data: file,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}