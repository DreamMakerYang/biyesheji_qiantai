<template>
<div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
	<!-- 标题 start -->
	<div style="margin-top:20px">
		<span>
			<i class="el-icon-house"></i> 
			<el-divider direction="vertical"></el-divider>
			垃圾仓库
		</span>
	</div>
	<!-- 标题 end -->

	<!-- 查询输入 start -->
	<div style="margin:20px 20px 20px 0">
			<el-select v-model="searchMap.optionsValue" placeholder="请选择">
				<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
			<el-input style="width: 200px;"
				placeholder="请输入内容"
				prefix-icon="el-icon-search"
				v-model="searchMap.rubbishName">
			</el-input>
			<el-button icon="el-icon-search" circle @click="search()"></el-button>

			<el-tooltip class="item" effect="light" content="发布信息需要先登录" placement="top" :disabled="isLogin">
				<div style="float: right;">
					<el-button type="primary" round plain :disabled="!isLogin" @click="showEdit=!showEdit">提供垃圾信息</el-button>
				</div>
			</el-tooltip>
	</div>
	<!-- 查询输入 end -->
	
<el-divider></el-divider>

	<!-- 编辑垃圾信息 start -->
	<el-form :model="data" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
		<el-collapse-transition>
			
        	<div v-show="showEdit"> 
				<el-form-item label="名称" prop="rubbishName">
					<el-input v-model="data.rubbishName" placeholder="请输入垃圾名称" style="margin-bottom: 10px;width: 200px;margin-right: 400px;"></el-input>
				</el-form-item>

				<el-form-item label="类别" prop="rubbishTypeNub">
					<el-select v-model="data.rubbishTypeNub" placeholder="请选择">
						<el-option
						v-for="item in options1"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="图片" prop="imageUrl">
                        <el-upload
                            style="margin-bottom: 10px;width: 450px;"
                            class="upload-demo"
                            ref="picture"
                            action=""
                            :http-request='uploadFileMethod'
                            :on-success="handleSuccess"
                            :on-change="beforeUpload"
                            :on-exceed="spillNub"
                            :file-list="fileList"
                            :auto-upload="false"
                            :limit="1"
                            accept=".jpg,.png"
                            list-type="picture">
                            <el-button size="small" type="primary">上传图片</el-button>
                        </el-upload>
                </el-form-item>

				<el-form-item label="简介" prop="rubbishIntro">
                    <el-input
                        type="textarea"
                        placeholder="请输入简介"
                        v-model="data.rubbishIntro"
                        maxlength="70"
                        show-word-limit
                        style="width: 500px;margin-bottom: 10px;"
                        >
                    </el-input>
                </el-form-item>

				<el-form-item style="height: 40px;">
					<el-button type="success" plain round @click="submit('ruleForm')" style="float:right">提交</el-button>
				</el-form-item>
				
        	</div>
		</el-collapse-transition>
	</el-form>
	<!-- 编辑垃圾信息 end -->


	<!-- 垃圾分类卡片 start -->
	<div>
		<el-row :gutter="12">
			<el-col :span="6" v-for="(item,index) in contentList" :key="index" >
				<el-card shadow="hover" style="margin-bottom: 10px;height: 430px;">
					<div style="margin: 0px auto;width: fit-content;">
						<img width="160" height="160" class="card" :src="item.imageUrl"/>
					</div>
					<div style="text-align:center">
						<div style="font-size: 24px;margin-top:10px" class="cardContent">{{item.rubbishName}}</div>
						<div style="font-size: 16px; color: rgb(70, 201, 101);">{{item.rubbishType}}</div>
					</div>
					<p class="cardContent">{{item.rubbishIntro}}</p>
				</el-card>
			</el-col>
		</el-row>
	</div>
	<!-- 垃圾分类卡片 end -->
</div>
</template>
<script>
import auth from '@/utils/auth'
import {mapState,mapMutations}from 'vuex'
import rubbishApi from '@/api/rubbish'
export default {

    created(){
        // 取到路由带过来的参数
        const seachContent = this.$route.query.seachContent
        console.log(seachContent)
        if(seachContent != undefined){
            this.searchMap.rubbishName = seachContent
            rubbishApi.search(this.currentPage,8,this.searchMap).then(res=>{
            	this.contentList = res.data.data.rows
            })
        }
    },

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
        // const seachContent = this.$route.query.seachContent
		// optionsValue 查询类型 state 审核状态
        return rubbishApi.search(1,8,{state: '1'}).then(res=>{
            return {contentList: res.data.data.rows}
        })
    },

	data(){
		// 表单验证函数
        var validateName = (rule, value, callback) => {
            if (value === undefined || value === '') {
            callback(new Error('请输入垃圾名称'));
            }
            callback();
        };
        var validateImage = (rule, value, callback) => {
            console.log(this.$refs.picture.uploadFiles.length)
            if (this.$refs.picture.uploadFiles.length === 0) {
                callback(new Error('请选择垃圾图片'));
            }
            callback();  
        };
        var validateIntro = (rule, value, callback) => {
            if (value === undefined || value === '') {
            callback(new Error('请输入垃圾简介'));
            }
            callback();  
        };
        var validateType = (rule, value, callback) => {
            console.log(value)
            if (this.data.rubbishTypeNub === undefined || this.data.rubbishTypeNub === '') {
            callback(new Error('请选择垃圾种类'));
            }
            callback();  
		};
		
		return{
            // 当前页数
            currentPage: 1,
            // 当前页面大小
            pageSize: 8,
			// 是否显示编辑区
			showEdit:false,
			// 用户编辑数据
			data:{},
			// 上传文件列表
			fileList:[],
			// 选择器内容
			options:[
				{value: '0',label: '全部'},
				{value: '1',label: '可回收垃圾'},
				{value: '2',label: '湿垃圾'},
				{value: '3',label: '干垃圾'}, 
				{value: '4',label: '有害垃圾'}
			],
			// 用户编辑选择内容
			options1:[
				{value: '1',label: '可回收垃圾'},
				{value: '2',label: '湿垃圾'},
				{value: '3',label: '干垃圾'}, 
				{value: '4',label: '有害垃圾'}
			],
			// 用户输入查询
			input:'',

			// 搜索内容集合
			searchMap: {
                rubbishName: '',
				// 选择器值
				optionsValue: '0',
				// 已通过状态
				state: '1'
			},

			rules: {
                rubbishName: [
                    { validator: validateName, trigger: 'blur' }
                ],
                rubbishTypeNub: [
                    { validator: validateType, trigger: 'blur' }
                ],
                imageUrl: [
                    { validator: validateImage, trigger: 'blur' }
                ],
                rubbishIntro: [
                    { validator: validateIntro, trigger: 'blur' }
                ]
            }
		}
	},
	methods:{
		// 瀑布流加载函数
		loadMore(){
			this.busy = true;
			// alert('触发loadMore，请求下一页的信息');
			this.currentPage++;
            rubbishApi.search(this.currentPage,8,this.searchMap).then(res=>{
            	this.contentList = this.contentList.concat(res.data.data.rows)
            })
			this.busy = false;
		},

		// 搜索方法
		search(){
			this.currentPage=1;
			rubbishApi.search(this.currentPage,8,this.searchMap).then(res=>{
            	this.contentList = res.data.data.rows
            })
		},

		// 图片上传
        uploadFileMethod(param){
            let fileObject = param.file;
            let formData = new FormData();
            formData.append("file", fileObject);

            rubbishApi.UploadFile(formData).then(response=>{
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

		// 提交撰写的垃圾
        submit(formName){
            // 表单验证
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 提交垃圾封面
                    this.$refs.picture.submit()

                    setTimeout(()=>{
                        rubbishApi.addRubbish(this.data).then(res=>{
                            this.$message({
                                message: res.data.message,
                                type: (res.data.flag ? 'success':'error')
                            })
                            if(res.data.flag){
								this.data = {}
								this.fileList=[]
								this.showEdit=false
                            }
                        })
                    },500)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            }); 
		},
		
		//文件上传成功
		handleSuccess() {

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
.card{
	border: 1px solid rgb(83, 213, 114);
	border-radius:50%;
}
.cardContent{
	font-family: "pinghei","Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
	font-size: 16px;
	line-height: 30px;
	font-weight: 300;
	font-style: normal;
}
</style>