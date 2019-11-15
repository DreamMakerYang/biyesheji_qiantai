<template>
    <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        <!-- 标题 start -->
        <div style="margin-top: 20px;height: 40px;margin-bottom: 20px;">
            <div>
                <i class="el-icon-tickets"></i> 
                <el-divider direction="vertical"></el-divider>
                小知识
                <el-tooltip class="item" effect="light" content="发布信息需要先登录" placement="top" :disabled="isLogin">
                    <div style="float: right;">
                        <el-button type="primary" round plain :disabled="!isLogin"  @click="showEdit=!showEdit">提交小知识</el-button>
		            </div>
                </el-tooltip>
            </div>
        </div>
        <!-- 标题 end -->  
        <!-- 富文本编辑器 start -->
        <el-form :model="data" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
            <el-collapse-transition>
                <div v-show="showEdit"> 
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="data.title" placeholder="请输入小知识标题" style="margin-bottom: 10px;width: 400px;margin-right: 400px;"></el-input>
                    </el-form-item>

                    <el-form-item label="封面" prop="picture">
                        <el-upload
                            style="margin-bottom: 10px;width: 450px;"
                            class="upload-demo"
                            ref="picture"
                            action=""
                            :http-request='uploadFileMethod'
                            :on-remove="handleRemove"
                            :on-change="beforeUpload"
                            :on-exceed="spillNub"
                            :file-list="fileList"
                            :auto-upload="false"
                            :limit="1"
                            accept=".jpg,.png"
                            list-type="picture">
                            <el-button size="small" type="primary">上传封面</el-button>
                        </el-upload>
                    </el-form-item>
                    
                    <el-form-item label="简介" prop="intro">
                    <el-input
                        type="textarea"
                        placeholder="请输入简介"
                        v-model="data.intro"
                        maxlength="70"
                        show-word-limit
                        style="width: 500px;margin-bottom: 10px;"
                        >
                        </el-input>
                    </el-form-item>

                    <el-form-item label="内容" prop="content">
                    <div class="quill-editor" 
                        :content="data.content"
                        @change="onEditorChange($event)"
                        @ready="onEditorReady($event)"
                        v-quill:myQuillEditor="editorOption">
                    </div>
                    </el-form-item>

                    <el-form-item style="height: 40px;">
                        <el-button type="primary" plain round @click="submit('ruleForm')" style="float:right">提交</el-button>
                    </el-form-item> 
                </div>
            </el-collapse-transition>
        </el-form>
        <!-- 富文本编辑器 end -->
        <el-divider></el-divider>

        <!-- 小知识展示区 start -->
        <div>
            <el-row :gutter="12">
			<el-col :span="8" v-for="(item,index) in tipsData" :key="index">
				<el-card shadow="hover" style="margin-bottom: 10px;height: 550px;" :body-style="{ padding: '0px' }" >
					<div style="margin: 0px auto;width: fit-content;" class="card">
						<!-- <img width="370" height="250" :src="item.imageUrl"/> -->
                        <el-image
                        style="width: 370px; height: 250px"
                        :src="item.imageUrl"
                        :fit="fit"></el-image>		
					</div>
                    <div style="margin: 5px 10px 0 10px;">
                        <div class="cardContent" style="border-bottom: solid 1px #DCDFE6;">
                            {{item.date}}
                        </div>
                        <div style="text-align:center">
                            <div style="font-size: 24px;margin-top:10px" class="cardContent">{{item.title}}</div>
                        </div>
                        <p class="cardContent">{{item.intro}}</p>
                    </div>
                    <div style="float: right;margin: 0 10px 10px 0;">
                        <a :href="'/know/item/'+item.id" target="_blank">
                            <el-button type="success" plain round >阅读详情</el-button>
                        </a>
                    </div>
                    
				</el-card>
			</el-col>
		</el-row>
        </div>
        <!-- 小知识展示区 end -->
    </div>
</template>


<script>
import auth from '@/utils/auth'
import {mapState,mapMutations}from 'vuex'
import knowApi from '@/api/know'
export default {
    computed:{
      ...mapState('user',{
        isLogin:state=>{
          if(state.isLogin==""){
            if(auth.getUser().token!= undefined){
              return true
            }
          }
          return state.isLogin
        },
      }),
    },
    asyncData(){
        return knowApi.search(1,6,{state:'1'}).then(res=>{
            return {tipsData: res.data.data.rows}
        })
    },
    data(){
        // 表单验证函数
        var validateTitle = (rule, value, callback) => {
            if (value === undefined || value === '') {
            callback(new Error('请输入标题'));
            }
            callback();
        };
        var validatePicture = (rule, value, callback) => {
            console.log(this.$refs.picture.uploadFiles.length)
            if (this.$refs.picture.uploadFiles.length === 0) {
                callback(new Error('请选择知识封面'));
            }
            callback();  
        };
        var validateIntro = (rule, value, callback) => {
            if (value === undefined || value === '') {
            callback(new Error('请输入知识简介'));
            }
            callback();  
        };
        var validateContent = (rule, value, callback) => {
            console.log(value)
            if (this.data.content === undefined || this.data.content === '') {
            callback(new Error('请输入知识内容'));
            }
            callback();  
        };

        return{
            // 图片列表
            fileList: [],
            // 当前页数
            currentPage: 1,
            // 当前页面大小
            pageSize: 10,
            
            // 是否显示编辑区
            showEdit: false,
            
            // 用户上传知识
            data:{},

            // 富文本编辑器工具栏
            editorOption: {
                theme:'snow',
                placeholder: '请输入小知识内容',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                        ['blockquote', 'code-block'],     //引用，代码块
                        [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
                        [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
                        [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
                        [{ 'direction': 'rtl' }],             // 文本方向
                        [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
                        [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
                        [{ 'font': [] }],     //字体
                        [{ 'align': [] }],    //对齐方式
                        ['image']    //上传图片
                    ]
                }
            },
            rules: {
                title: [
                    { validator: validateTitle, trigger: 'blur' }
                ],
                picture: [
                    { validator: validatePicture, trigger: 'blur' }
                ],
                intro: [
                    { validator: validateIntro, trigger: 'blur' }
                ],
                content: [
                    { validator: validateContent, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorChange({ editor, html, text }){// 内容改变事件
            this.data.content = html;
        }, 
        // 图片上传
        uploadFileMethod(param){
            let fileObject = param.file;
            let formData = new FormData();
            formData.append("file", fileObject);

            knowApi.UploadFile(formData).then(response=>{
                if (response) {
                    this.data.imageUrl = response.data.data;
                    console.log("data.imageUrl==", this.data.imageUrl);
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
        // 提交撰写的新闻
        submit(formName){
            // 表单验证
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 提交新闻封面
                    this.$refs.picture.submit()

                    setTimeout(()=>{
                        knowApi.addKnow(this.data).then(res=>{
                            this.$message({
                                message: res.data.message,
                                type: (res.data.flag ? 'success':'error')
                            })
                            if(res.data.flag){
                                this.data = {}
                            }
                        })
                    },500)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            }); 
        },

        // 瀑布流加载函数
        loadMore(){
          this.busy = true;
          // alert('触发loadMore，请求下一页的信息');
            this.currentPage++;
                knowApi.search(this.currentPage,6,{state:'1'}).then(res=>{
                this.tipsData = this.tipsData.concat(res.data.data.rows)
            })
          this.busy = false;
        },

        //文件列表移除文件时的钩子
        handleRemove() {

        },

        beforeUpload(file) {
          console.log(file)
          var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
          const extension = testmsg === 'jpg'
          const extension1 = testmsg === 'JPG'
          const extension2 = testmsg === 'png'
          const extension3 = testmsg === 'PNG'
          const isLt2M = file.size / 1024 / 1024 < 1
          if(!extension && !extension1 && !extension2 && !extension3) {
              this.$message({
                  message: '图片格式错误!',
                  type: 'error'
              });
          }
          if(!isLt2M) {
              this.$message({
                  message: '上传文件大小不能超过 1MB!',
                  type: 'error'
              });
          }
          if(! (extension || extension1 || extension2 || extension3) && isLt2M) 
            this.fileList = []
          // return extension || extension2
      },
      
      // 文件超出个数限制时的钩子
      spillNub(){
        this.$message({
            message: '图片数量不能超过1张!',
            type: 'error'
        });
      }
    }
    
}
</script>
<style scoped>
.cardContent{
	font-family: "pinghei","Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
	font-size: 16px;
	line-height: 30px;
	font-weight: 300;
	font-style: normal;
}
</style>