<template>
<div>
    <el-upload class="upload-demo" action="" :http-request='uploadFileMethod' :show-file-list="false" multiple>
      <el-button class="custom-btn" size="small">上传</el-button>
    </el-upload>
</div>
    
</template>
<script>
import testApi from '@/api/test'
export default {
    methods:{
        uploadFileMethod(param) {
            let fileObject = param.file;
            let formData = new FormData();
            formData.append("file", fileObject);

            testApi.UploadFile(formData)
                .then(response => {
                    if (Array.isArray(response)) {
                        if (response) {
                            this.$message({
                                showClose: true,
                                message: "上传成功。",
                                type: "success"
                            });
                            this.getFileList(id);
                        }
                    } else {
                        this.$message.error(response.message);
                    }
                    console.log("response==", response);
                })
                .catch(message => {
                    console.log("message======================", message);
                    this.$message.error("上传失败，请联系管理员");
                });
        },
    }
    
}
</script>
