<template>
	<div class="container">
		<el-container>
				<el-main>
					<!-- 标题 -->
					<span>
						<i class="el-icon-chat-round"></i> 
						<el-divider direction="vertical"></el-divider>
						趣事
      		</span>

					<div class="content_main">
						<div style="padding: 40px 40px 0 40px;">
							<!-- 用户头像和名称 -->
							<div>
								<el-avatar :src="dynamic.authorImage"></el-avatar>
								{{dynamic.authorName}}
							</div>
							<!-- 内容 start -->
							<div style="margin:20px">
								{{dynamic.content}}
							</div>
							<!-- 内容 end -->

							<!-- 图片区 start -->
							<div v-if="urls !==undefined && urls.length > 0 " style="height:200px">
								<div v-for="url in urls" :key="url" style="float:left;margin:0 10px">
									<el-tooltip class="item" effect="light" content="点击大图浏览" placement="top">
										<el-image 
											style="width: 200px; height: 200px"
											:src="url" 
											fit="scale-down"
											:preview-src-list="urls">
										</el-image>
									</el-tooltip>
								</div>
							</div>
							<!-- 图片区 end -->

							<!-- 点赞分享评论 start -->
							<div style="margin:20px;width=100%;height:32px;">
								<div style="float:right;">
									<div style="float: left;margin-right: 10px;">已被点赞{{dynamic.star}}次</div>
									<el-tooltip content="需要登录" placement="top"  effect="light" :disabled="isLogin">
									<el-tooltip content="点赞" placement="top"  effect="light">
										<div style="float: left;margin-right: 10px;">
										<el-button type="danger" icon="el-icon-star-off" size="small" :disabled="!isLogin" circle :plain="!hasStar" @click="setStar()"></el-button>
										</div>
									</el-tooltip>
									</el-tooltip>
									<el-tooltip content="分享" placement="top"  effect="light">
										<div style="float: left;margin-right: 10px;">
										<el-button type="success" icon="el-icon-share" size="small" circle plain></el-button>
										</div>
									</el-tooltip>
									<el-tooltip content="需要登录" placement="top"  effect="light" :disabled="isLogin">
									<el-tooltip content="评论" placement="top" effect="light">
										<div style="float: left;margin-right: 10px;">
										<el-button type="primary" icon="el-icon-edit" size="small" :disabled="!isLogin" circle plain @click="showComment=!showComment"></el-button>
										</div>
									</el-tooltip>
									</el-tooltip>
								</div>
							</div>

							<!-- 点赞分享评论 end -->

							<!-- 评论 start -->
							<div style="margin:20px">
								<el-collapse-transition>
									<div v-show="showComment">
										<div class="edit_container">
											<el-input
												type="textarea"
												placeholder="请输入内容"
												v-model="textarea"
												maxlength="200"
												show-word-limit
											>
											</el-input>
										</div>
										<div style="width:100%;height: 42px;">
											<el-button style="float: right;margin-top:5px" size="small" type="primary" @click="submitUpload">发表</el-button>
										</div>
									</div>
								</el-collapse-transition>
							</div>
							<!-- 评论 end -->
							<el-divider></el-divider>
							<!-- 评论显示区 start -->
							<div>
								<span>
									<i class="el-icon-chat-line-round"></i> 
									<el-divider direction="vertical"></el-divider>
									评论
								</span>
								<div v-if="comments.length === 0" style="padding: 30px 0px;font-size: smaller;text-align: center;">
									暂时还没有人评论，快来抢沙发~
								</div>
								<ul style="padding-inline-start: 0px;">
									<li class="activity-item" v-for="(item,index) in comments" :key="index">
										<div>
											<el-avatar :src="item.authorImage"></el-avatar>
											{{item.authorName}}
										</div>
										<div style="margin: 20px;">{{item.content}}</div>
									</li>
								</ul>
							</div>
							<!-- 评论显示区 end -->
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
import dynamicApi from '@/api/dynamic'
import indexApi from '@/api/index'
import auth from '@/utils/auth'
import {mapState,mapMutations}from 'vuex'
import axios from 'axios'
export default {
    computed:{
      ...mapState('user',{
        isLogin:state=>{
          if(state.isLogin==""){
            if(auth.getUser().token != undefined){
              return true
            }
          }
          return state.isLogin
        },
      }),
    },
	asyncData({params}){
    return axios.all([dynamicApi.getDynamicById(params.id),dynamicApi.getCommentById(params.id),indexApi.getHotNews(),dynamicApi.getImageById(params.id)]).then(
      axios.spread(function(dynamic,comments,newsList,imageList){
          return {
			  dynamic: dynamic.data.data,
			  comments: comments.data.data,
			  newsList: newsList.data.data,
			  urls: imageList.data.data
          }
      })
    )
  },
	data(){
		return{
			// 是否显示评论区
			showComment: false,
			//评论内容
			textarea:'',

			hasStar:false,
			}
		},
		created(){
			if(auth.getUser().token !== undefined){
				dynamicApi.hasStar(this.$route.params.id).then(res=>{
					this.hasStar = res.data.data
				})
			}
			
		},
		methods:{
			// 评论提交事件
			submitUpload(){
				dynamicApi.addComment(this.textarea,this.$route.params.id).then(res=>{
					this.$message({
                        message: res.data.message,
                        type: (res.data.flag ? 'success':'error')
					})
					if(res.data.flag){
						dynamicApi.getCommentById(this.$route.params.id).then(response=>{
							this.comments = response.data.data
						})
						// 是否显示评论区
						this.showComment = false
						//评论内容
						this.textarea = ''
					}
				})
			},
			
			// 用户点赞或者取消点赞
			setStar(){
				dynamicApi.setStar(this.$route.params.id, this.hasStar ? -1:1).then(res=>{
					this.$message({
						message: res.data.message,
						type: (res.data.flag ? 'success':'warning')
					})
					if(res.data.flag){
						// 点赞
						this.hasStar = true
						this.dynamic.star++
					}else{
						// 取消点赞
						this.hasStar = false
						this.dynamic.star--
					}
				})
			}
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
</style>