<template>
  <div>
    <header>

      <div class="container">
        <div>
          <img src="../assets/logo.png"/>

          <div  style="float:right;margin-top: 30px;">
            <!-- 头像 -->
            <div v-show="isLogin" @click="drawer=!drawer" style="cursor:pointer;">
              <el-badge :is-dot="isDot" >
                <el-avatar fit="fill" :src="user.image"></el-avatar>
              </el-badge>
              {{user.name}}
            </div>
              
            <!-- 登录注册按钮 -->
            <div v-show="!isLogin">
              <el-button round @click="loginVisible = true">登录 | 注册</el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 抽屉个人中心 start -->
      <el-drawer
        title="个人中心"
        :visible.sync="drawer"
        size="30%"
        >
        <div style="width: 100px;margin: 0 auto;text-align:center">
          <el-avatar :size="100" :src="user.image"></el-avatar>
          <p>{{user.name}}</p>
        </div>
        <!-- 个人信息 -->
        <div style="border-radius: 30px;border: 1px solid #d7dae2;margin:0 15px;padding:0 20px">
          <div style="margin-top: 10px;">
            <i class="el-icon-user"></i> 
            <el-divider direction="vertical"></el-divider>
            个人信息
          </div>
          
          <p>手机号：{{user.phone}}</p>
          <p>性别：{{user.gender}}</p>
          <el-button round style="float:right" @click="personInfoVisible = true">修改</el-button>
          <p>注册时间：{{user.date}}</p>
          
        </div>

        <div style="margin:10px 15px;">
          <div class="personDiv" style="margin:0 1px 1px 0;">
            <div style="margin-top: 10px;">
              <i class="el-icon-chat-square"></i> 
              <el-divider direction="vertical"></el-divider>
              我的动态
            </div>
            <div style="width: 180px;height: 29px;margin: 10px 0;">
              <el-tooltip class="item" effect="light" content="动态数量" placement="bottom" >
                <div style="float:left">
                  <i class="el-icon-edit-outline"></i> 
                  322
                </div>
              </el-tooltip>

              <el-tooltip class="item" effect="light" content="评论数量" placement="bottom" >
                <div style="float:left;margin-left: 10px;">
                  <i class="el-icon-chat-line-round"></i> 
                  322
                </div>
              </el-tooltip>

              <el-tooltip class="item" effect="light" content="点赞数量" placement="bottom" >
                <div style="float:left;margin-left: 10px;">
                  <i class="el-icon-star-off"></i> 
                  21
                </div>
              </el-tooltip>
            </div>
          </div>

          <div class="personDiv" style="margin:0 0 1px 1px;">
            <div style="margin-top: 10px;">
              <i class="el-icon-video-camera"></i> 
              <el-divider direction="vertical"></el-divider>
              我的新闻
            </div>
            <div style="width: 180px;height: 29px;margin: 10px 0;">
              <el-tooltip class="item" effect="light" content="新闻数量" placement="bottom" >
                <div style="float:left">
                  <i class="el-icon-edit-outline"></i> 
                  322
                </div>
              </el-tooltip>

              <el-tooltip class="item" effect="light" content="评论数量" placement="bottom" >
                <div style="float:left;margin-left: 10px;">
                  <i class="el-icon-chat-line-round"></i> 
                  322
                </div>
              </el-tooltip>

              <el-tooltip class="item" effect="light" content="浏览数量" placement="bottom" >
                <div style="float:left;margin-left: 10px;">
                  <i class="el-icon-view"></i> 
                  21
                </div>
              </el-tooltip>
            </div>
          </div>

          <div class="personDiv" style="margin:1px 1px 0 0">
            <div style="margin-top: 10px;">
              <i class="el-icon-house"></i> 
              <el-divider direction="vertical"></el-divider>
              我的垃圾
            </div>
            <div style="width: 180px;height: 29px;margin: 10px 0;">
              <el-tooltip class="item" effect="light" content="垃圾数量" placement="bottom" >
                <div style="float:left">
                  <i class="el-icon-postcard"></i> 
                  322
                </div>
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="点赞数量" placement="bottom" >
                <div style="float:left;margin-left: 10px;">
                  <i class="el-icon-star-off"></i> 
                  21
                </div>
              </el-tooltip>
            </div>
          </div>

          <div class="personDiv" style="margin:1px 0 0 1px">
            <div style="margin-top: 10px;">
              <i class="el-icon-tickets"></i> 
              <el-divider direction="vertical"></el-divider>
              我的小知识
            </div>
            <div style="width: 180px;height: 29px;margin: 10px 0;">
              <el-tooltip class="item" effect="light" content="知识数量" placement="bottom" >
                <div style="float:left">
                  <i class="el-icon-edit-outline"></i> 
                  322
                </div>
              </el-tooltip>

              <el-tooltip class="item" effect="light" content="评论数量" placement="bottom" >
                <div style="float:left;margin-left: 10px;">
                  <i class="el-icon-chat-line-round"></i> 
                  322
                </div>
              </el-tooltip>

              <el-tooltip class="item" effect="light" content="浏览数量" placement="bottom" >
                <div style="float:left;margin-left: 10px;">
                  <i class="el-icon-view"></i> 
                  21
                </div>
              </el-tooltip>
            </div>
          </div>
          
        </div>

        <el-button type="danger" round plain style="float:right;margin:10px" @click="LogOut()">退出登录</el-button>
      </el-drawer>
      <!-- 抽屉个人中心 end -->

      <!-- 登录窗口 start -->
      <el-dialog
        title="登录"
        :visible.sync="loginVisible"
        width="30%"
        center>
        <el-form ref="loginForm" :model="loginForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="手机号：">
              <el-input placeholder="请输入用户名" v-model="loginForm.phone" ></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input placeholder="请输入密码" v-model="loginForm.pass" show-password></el-input>
            </el-form-item>
        </el-form>
        <el-link type="danger" style="float: right" @click="toRegister()">还没有帐号？注册</el-link>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="Login()">登 录</el-button>
        </span>
      </el-dialog>
      <!-- 登录窗口 end -->

      <!-- 注册窗口 start -->
      <el-dialog
        title="注册"
        :visible.sync="registerVisible"
        width="30%"
        center>
        <!-- :rules绑定data中的验证映射 -->
        <el-form ref="registerForm" status-icon :rules="rules" :model="registerForm" label-width="100px">
          <el-form-item label="昵称：" prop="name">
            <el-input placeholder="请输入用户名" v-model="registerForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input placeholder="请输入用户名" v-model="registerForm.phone" ></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-switch
              v-model="registerForm.gender"
              active-text="女"
              inactive-text="男">
            </el-switch>
          </el-form-item>
          <el-form-item label="密码：" prop="pass">
            <el-input placeholder="请输入密码" v-model="registerForm.pass" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input placeholder="请再次输入密码" v-model="registerForm.checkPass" show-password></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitRegisterForm('registerForm')">注 册</el-button>
        </span>
      </el-dialog>
      <!-- 注册窗口 end -->

      <!-- 修改个人信息 start -->
        <el-dialog
          title="个人信息修改"
          :visible.sync="personInfoVisible"
          width="30%"
          >
          <el-form ref="form" :model="personForm" label-width="80px" :rules="rules">
          <!-- 头像上传 -->
          <el-form-item label="头像：" prop="image">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-change="beforeUpload"
            :on-exceed="spillNub"
            :limit="1"
            accept=".jpg,.png">
            <img v-if="personForm.image" :src="personForm.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item>

          <el-form-item label="昵称：" prop="name">
              <el-input v-model="personForm.name"></el-input>
          </el-form-item>

          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="personForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="密码：" prop="pass" >
            <el-input v-model="personForm.pass" show-password></el-input>
          </el-form-item>

          <el-form-item label="性别：">
              <el-radio-group v-model="personForm.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
              </el-radio-group>
          </el-form-item>

          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="personInfoVisible = false">修 改</el-button>
            <el-button @click="personInfoVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      <!-- 修改个人信息 end -->

      <!-- 导航栏 start -->
      <div class="container">
        <el-menu :default-active="activeMenuIndex" router class="el-menu-demo" mode="horizontal">
          <el-menu-item index="/" >首页</el-menu-item>
          <el-menu-item index="/dynamic" >动态</el-menu-item>
          <el-menu-item index="/news">新闻</el-menu-item>
          <el-submenu index="3">
            <template slot="title">垃圾类别</template>
            <el-menu-item index="/classify/1">可回收垃圾</el-menu-item>
            <el-menu-item index="/classify/2">湿垃圾</el-menu-item>
            <el-menu-item index="/classify/3">干垃圾</el-menu-item>
            <el-menu-item index="/classify/4">有害垃圾</el-menu-item>
          </el-submenu>
          <el-menu-item index="/warehouse">垃圾库</el-menu-item>
          <el-menu-item index="/know">小知识</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
        </el-menu>
      </div>
      <!-- 导航栏 end -->
      <div class="line"></div>
    </header>

    <!-- 模版嵌入 start -->
    <nuxt/>
    <!-- 模版嵌入 end -->

    <footer>
      <div class="footer ">
        <div class="container" style="padding: 20px;text-align:center;">
          <ul class="footul">
            <li>
              所属学校
            </li>
            <li>
              <el-link type="info" href="http://www.jcut.edu.cn/" target="_blank">荆楚理工</el-link>
            </li>
          </ul>
          <ul class="footul">
            <li>
              个人博客
            </li>
            <li>
              <el-link type="info" href="https://blog.csdn.net/qq_42120178" target="_blank">天道酬勤</el-link>
            </li>
          </ul>
          <ul class="footul">
            <li>
              友情链接
            </li>
            <li>
              <el-link type="info" href="http://www.pengyanak.cn/" target="_blank">PengyanAK</el-link>
            </li>
          </ul>
          <ul style="float:right">
            <li style="font-size: 28px;">
              邮箱:389093147@qq.com
            </li>
            <li style="float:right;color: #676767;">
              (周一至周五 10:00-18:00)
            </li>
          </ul>
        </div>
      </div>

      <!-- 版权 start -->
      <div class="foot">
        <p>Copyright @ 2008-2019 Lois 刘志洋</p>
      </div>
      <!-- 版权 end -->
    </footer>

    <!-- 返回顶端 -->
    <el-backtop target=""></el-backtop>
  </div>
</template>

<script>
import userApi from '@/api/user'
import auth from '@/utils/auth'
import {mapState,mapMutations}from 'vuex'
import axios from 'axios'
  export default {
    created(){
      this.user = auth.getUser();
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
      //设置导航栏激活样式
      activeMenuIndex () {
        return '/'+this.$route.path.split('/')[1]
      },
    },

    data() {
      // 注册表单验证 callback不管如何都要调用
      var validateName = (rule, value, callback)=>{
        if (value === '') {
          callback(new Error('请输入昵称'));
        }else {
          callback();
        }
      };

      var validatePhone = (rule, value, callback)=>{
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (value === '') {
            callback(new Error('请输入电话号码'));
        }else {
          if(!phoneReg.test(value)){
            callback(new Error('请输入正确的手机号'));
          }else{
            // userApi.findUserCountByPhone(value)
            userApi.findUserCountByPhone(value).then(res=>{
              if(res.data.flag){
                callback();
              }else{
                callback(new Error('该手机号已被注册'));
              }
            })
          }
        }
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        // 登录窗口是否可见
        loginVisible: false,
        // 注册窗口是否可见
        registerVisible: false,
        // 个人信息修改窗口是否可见
        personInfoVisible:false,
        // 个人中心是否显示
        drawer: false,

        // 用户头像上的小红点是否显示
        isDot: true,
        
        // 登录用户
        user:{
          name: '',
          image:'',
          info:{
            phone:'',
            gender:'',
            date:''
          }
        },

        // 个人信息表单
        personForm:{},

        // 登录表单
        loginForm: {
          
        },
        registerForm:{
          name:'',
          phone: '',
          gender:'false',
          pass: '',
          checkPass: ''
        },
        // 注册表单验证 映射到方法
        rules: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 获取vuex中修改isLogin的方法
      ...mapMutations('user',['SET_isLogin']),

      Login(){
        userApi.login(this.loginForm).then(res=>{
          this.$message({
              message: res.data.message,
              type: (res.data.flag ? 'success':'error')
          });
          // 如果登录成功
          if(res.data.flag){
            this.loginVisible = false;
            auth.setUser(res.data.data.token,res.data.data.name,res.data.data.image,res.data.data.phone,res.data.data.gender,res.data.data.date)
            this.user.name = res.data.data.name
            this.user.image = res.data.data.image
            this.user.phone = res.data.data.phone
            this.user.gender = res.data.data.gender
            this.user.date = res.data.data.date
            this.personForm = this.user
            Promise.all([this.SET_isLogin(true)])
            // 清空登录列表
            this.loginForm={};
          }
        })
        
      },

      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      // 登录窗口跳转到注册窗口
      toRegister(){
        this.loginVisible=false;
        this.registerVisible=true;
      },
      
      // 注册窗口中的提交按钮检验
      submitRegisterForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            console.log('submit!!');
            userApi.register(this.registerForm).then(res=>{
              this.$message({
              message: res.data.message,
              type: (res.data.flag ? 'success':'error')
              });
              if(res.data.flag){
                this.registerVisible = false;
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 用户退出登录
      LogOut(){
        console.log("退出用户")
        auth.removeUser();
        this.SET_isLogin(false);
        this.drawer = false;
        location.reload();
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
<style>
.container{
    width: 1140px;
    padding: 0 ;
    margin: 0 auto;
}
.foot{
    height: 50px;
    width: 100%;
    float: left;
    color: #ffffff;
    text-align: center;
    background: #555555;
}
.footer{
  width: 100%;
  height: 128px;
  background: #F0F0F0;
}
ul li{
  list-style: none;
}
a{
  text-decoration:none;
  color: #000000;
}
body{
  font-family: "pinghei","Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
	font-size: 16px;
	line-height: 30px;
	font-weight: 300;
	font-style: normal;
}
.personDiv{
  border-radius: 10px;
  border: 1px solid #d7dae2;
  width:40%;
  float: left;
  padding:0 20px;
}
.footul{
    float: left;
    padding: 0;
    margin-right: 100px;
}

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>

