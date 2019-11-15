<template>
  <div>
    <!-- 走马灯 -->
    <div class="block">
      <el-carousel height="500px">
        <!-- <el-carousel-item >
          <img src="../assets/images/zoumadeng1.jpg"/>
        </el-carousel-item>
        <el-carousel-item >
          <img src="../assets/images/zoumadeng2.jpg"/>
        </el-carousel-item> -->
        <el-carousel-item v-for="(picSrc,index) in picture" :key="index">
          <img :src="picSrc.imageUrl"/>
        </el-carousel-item>
        <!-- <el-carousel-item >
          <img src="../assets/images/zoumadeng4.jpg"/>
        </el-carousel-item> -->
      </el-carousel>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <div style="margin:70px">
      <div class="search">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item >
            <el-autocomplete
              style="width: 700px;"
              prefix-icon="el-icon-search"
              v-model="seachContent"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              placeholder="搜索垃圾查询分类"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 分割线 -->

    <el-divider></el-divider>

    <div class="container">

      <div class="text">
        <h3 style="margin: 0px">垃圾分类</h3>
        <span class="textdown"></span>
      </div>
      
      <el-container >

        <el-row :gutter="50">
          
          <el-col :span="6" >
            <a href="/classify/1">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img src="../assets/images/garbageSorting/t1.png" class="image">
                <div style="padding: 14px;">
                  <span>可回收物</span>
                  <div class="bottom clearfix">
                    <time class="time">废纸、废塑料、废玻璃制品、废金属、废织物等与这些材质有关的适宜回收，并且可以回收重复利用的生活废弃物。</time>
                  </div>
                </div>
              </el-card>
          </a>
          </el-col>
          
          <el-col :span="6" >
            <a href="/classify/2">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img src="../assets/images/garbageSorting/t2.png" class="image">
            <div style="padding: 14px;">
              <span>干垃圾</span>
              <div class="bottom clearfix">
                <time class="time">生活中的其它垃圾，并且不属于湿垃圾、有害垃圾、可回收垃圾的垃圾分类，也叫其它垃圾。无有效化解其他垃圾的方法，所以需尽量少产生。</time>
              </div>
            </div>
          </el-card>
            </a>
          </el-col>
          

          <el-col :span="6" >
            <a href="/classify/3">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img src="../assets/images/garbageSorting/t3.png" class="image">
            <div style="padding: 14px;">
              <span>湿垃圾</span>
              <div class="bottom clearfix">
                <time class="time">易腐垃圾，如食材废弃料、剩饭剩菜、过期食品、水果皮、干果垃圾，废弃植物、中药残渣等生活废弃物品。</time>
              </div>
            </div>
          </el-card>
            </a>
          </el-col>
          
        <el-col :span="6" >
          <a href="/classify/4">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img src="../assets/images/garbageSorting/t4.png" class="image">
            <div style="padding: 14px;">
              <span>有害垃圾</span>
              <div class="bottom clearfix">
                <time class="time">废电池、费灯泡灯管、废药品、废油漆，以及有损人身体健康或者对环境直接或者间接会造成污染，有潜在危害的生活用品。</time>
              </div>
            </div>
          </el-card>
          </a>
        </el-col>
        </el-row>
      </el-container>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <div class="container">

      <div class="text">
        <h3 style="margin: 0px">热门关注</h3>
        <span class="textdown"></span>
      </div>

      <div>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item :title="attention.title" :name="index" v-for="(attention,index) in hotAttention" :key="index">
            <div>{{attention.content}}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
      

    </div>

  </div>

  
</template>

<script>
import rubbishApi from '@/api/rubbish'
import indexApi from '@/api/index'
import axios from 'axios'
export default {

  asyncData(){
    return axios.all([indexApi.getPicture(),indexApi.getHotAttention()]).then(
      axios.spread(function(picture,hotAttention){
          return {
              picture: picture.data.data,
              hotAttention: hotAttention.data.data
          }
      })
    )
  },
  data() {
      return {
        // 搜索建议列表
        seachList:[],
        // 用户搜索内容
        seachContent: '',
        // 热门关注打开的标签
        activeName: '1'
      }
    },
    methods: {
      onSubmit() {
        // axios.get('/api/setting/setting/attention')
        console.log('submit!');
        this.$router.push({
           path: '/warehouse',
           // name: 'mallList',
           query: {
             seachContent: this.seachContent
           }
         })
      },

      querySearch(queryString, cb) {
        console.log(queryString)
        rubbishApi.findByName(queryString).then(res=>{
          if(res.data.flag){
            cb(res.data.data);
          }
        })
        // var seachList = this.seachList;
        // var results = queryString ? seachList.filter(this.createFilter(queryString)) : seachList;
        // 调用 callback 返回建议列表的数据
        
      },
      // 匹配字段
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .search{
    width: 800px;
    height: 50px;
    padding: 0 ;
    margin: 0 auto;
  }

    .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .textdown{
    background: #67AF2F;
    display: block;
    width: 64px;
    height: 2px;
    margin: 10px auto;
  }

  .text{
    height: 24px;
    margin: 40px 0;
    text-align: center;
    color: #67AF2F
  }

</style>
