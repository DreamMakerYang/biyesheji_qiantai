<template>
<div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
  <el-container>
    <el-main>
      <!-- 用户编写区 start -->
      <el-collapse-transition>
      <div v-show="showEdit"> 
      <el-form :model="data" status-icon :rules="rules" ref="ruleForm" label-width="50px"  class="demo-ruleForm">
        <span>
          <i class="el-icon-edit"></i> 
          <el-divider direction="vertical"></el-divider>
          说出你的故事：
        </span>
        <el-form-item class="edit_container" label="标题"  prop="title">
          <el-input style="width:200px" placeholder="请输入标题" v-model="data.title"></el-input>
        </el-form-item>
        <el-form-item class="edit_container" label="内容"  prop="textarea">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="data.content"
            maxlength="200"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-upload
          class="upload-demo"
          action=""
          ref="picture"
          :http-request='uploadFileMethod'
          :on-remove="handleRemove"
          :on-change="beforeUpload"
          :on-exceed="spillNub"
          :file-list="fileList"
          :auto-upload="false"
          :limit="3"
          multiple
          accept=".jpg,.png"
          list-type="picture">
          
          <el-button slot="trigger" size="small" type="primary">添加图片</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('ruleForm')">提交</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

        </el-upload>
      </el-form>
      </div>
      </el-collapse-transition>

      <!-- 用户编写区 end -->
      <el-divider></el-divider>

      <!-- 瀑布流加载区 start -->
      <span>
        <i class="el-icon-chat-square"></i> 
        <el-divider direction="vertical"></el-divider>
        最新
        <el-tooltip class="item" effect="light" content="发布信息需要先登录" placement="top" :disabled="isLogin">
            <div style="float: right;">
                <el-button type="primary" round plain :disabled="!isLogin" @click="showEdit=!showEdit">发布动态</el-button>
            </div>
        </el-tooltip>
      </span>
      <div>
        <ul style="padding: unset">
          <a :href="'dynamic/item/'+item.id" target="_blank" v-for="(item,index) in tableData" :key='index'>
            <li class="activity-item">
                <span>{{item.title}}</span>
                <span>{{item.authorName}}</span>
            </li>
          </a>
        </ul>
      </div>
      <!-- 瀑布流加载区 end -->
    </el-main>

    <!-- 侧边区 start -->
    <el-aside style="padding: 20px;">
        <span>
          <i class="el-icon-notebook-2"></i> 
          <el-divider direction="vertical"></el-divider>
          推荐新闻
      </span>
      <!-- 新闻推荐区 -->
      <el-collapse accordion style="margin-top:10px">
        <el-collapse-item :title="item.title" :name="index" v-for="(item,index) in newsList" :key="index">
          <div>{{item.content}}</div>
          <div style="float: right;">
            <el-link type="primary" :href="'https:'+item.id" target="_blank">
              查看
              <i class="el-icon-view el-icon--right"></i> 
            </el-link>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <!-- 侧边区 end -->
  </el-container>
</div>
</template>

<script>
import dynamicApi from '@/api/dynamic'
import {mapState,mapMutations}from 'vuex'
import indexApi from '@/api/index'
import auth from '@/utils/auth'
import axios from 'axios'
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
    return axios.all([dynamicApi.search(1,10,{state:'1'}),indexApi.getHotNews()]).then(
      axios.spread(function(tableData,newsList){
          return {
              tableData: tableData.data.data.rows,
              newsList: newsList.data.data
          }
      })
    )
  },

  data () {
    // 表单验证函数
    var validateTitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入标题'));
        }
        callback();
    };
    var validateTextarea = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入动态'));
        }
        callback();
    };

    return {
      data: {
        title:'',
        content:'',
        imageUrl:''
      },
      //用户图片上传列表
      fileList: [],
      // 是否显示编辑区
      showEdit: false,
      // 瀑布流加载开关
      busy: false,
      // 当前页数
      currentPage: 1,
      // 当前页面大小
      pageSize: 10,

      rules: {
        textarea: [
            { validator: validateTextarea, trigger: 'blur' }
        ],
        title: [
            { validator: validateTitle, trigger: 'blur' }
        ],
        }
      }
  },
  methods:{
      // 瀑布流加载函数
      loadMore(){
        this.busy = true;
        // alert('触发loadMore，请求下一页的信息');
        this.currentPage++;
        dynamicApi.search(this.currentPage,10,{state:'1'}).then(res=>{
          this.tableData = this.tableData.concat(res.data.data.rows)
        })
        this.busy = false;
      },

      uploadFileMethod(param){
        let fileObject = param.file;
        let formData = new FormData();
        formData.append("file", fileObject);

        dynamicApi.UploadFile(formData).then(response=>{
          if (response) {
            this.data.imageUrl = this.data.imageUrl.concat(','+response.data.data);
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
      // 用户提交函数
      submitUpload(formName) {
        // 表单验证
        this.$refs[formName].validate((valid) => {
            if (valid) {
                // 提交动态图片
                this.$refs.picture.submit()

                setTimeout(()=>{
                  dynamicApi.addDynamic(this.data).then(res=>{
                    this.$message({
                        message: res.data.message,
                        type: (res.data.flag ? 'success':'error')
                    })
                    if(res.data.flag){
                      this.data={
                      title:'',
                      content:'',
                      imageUrl:''
                      }
                      this.fileList = []
                    }
                  })
                },1000)
            } else {
                console.log('error submit!!');
                return false;
            }
        }); 
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
            message: '图片数量不能超过3张!',
            type: 'error'
        });
      }
      
  }
}
</script>

<style scoped>
.edit_container{
  margin-top: 10px;
}
.activity-item{
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px #EBEEF5 solid;
}

li:hover{
  background-color: #EBEEF5
}
</style>