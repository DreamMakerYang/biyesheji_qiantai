<template>
	<div class="container">
		<el-container>
            <el-main>
                <!-- 标题 -->
                <span>
                    <i class="el-icon-video-camera"></i> 
                    <el-divider direction="vertical"></el-divider>
                    新闻详情
                </span>

                <div class="content_main">
                  <div class="cardContent" style="padding: 30px;">
                    <div style="height: 85px;">
                      <div style="text-align: center;"><h2>{{text.title}}</h2></div> 
                      <div style="float: right;margin-right: 10px;">作者：{{text.authorName}}</div>
                    </div>
              
                    <!-- v-html 能够动态加载html -->
                    <div v-html="text.content"></div>

                  </div>
                    
                </div>
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
import indexApi from '@/api/index'
import axios from 'axios'
import newsApi from '@/api/news'
	export default {
    asyncData({params}){
      return axios.all([newsApi.getNewsById(params.id),indexApi.getHotNews()]).then(
        axios.spread(function(text,newsList){
            return {
                text: text.data.data,
                newsList: newsList.data.data
            }
        })
      )
  },
    data(){
			return{
        
        }
		},
		methods:{
			
		}
  }

</script>

<style scoped>
.content_main{
	box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
	width: 100%;
	margin-top: 20px;
}
li:hover{
  background-color: rgb(236, 238, 243)
}
.activity-item{
  border-bottom: 1px #EBEEF5 solid;
}
.cardContent{
	font-family: "pinghei","Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
	font-size: 16px;
	line-height: 30px;
	font-weight: 300;
	font-style: normal;
}
</style>