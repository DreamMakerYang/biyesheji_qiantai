<template>
    <div class="container">
        <!-- 标题 start -->
        <div style="margin-top: 20px;height: 40px;margin-bottom: 20px;">
            <div>
                <i class="el-icon-user"></i> 
                <el-divider direction="vertical"></el-divider>
                关于
            </div>
        </div>
        <!-- 标题 end -->
        <div class="test">
            <el-container>
                <el-aside width="500px" style="text-align: center;">
                    <img src="../../assets/images/about/about.png" style="width: 500px;"/>
                    宜昌市三峡大坝
                </el-aside>
                <el-main>
                    <div>
                        <p>网站作者来自水电之都——中国湖北省宜昌市。</p>
                        <p>网站设计之初是作为毕业设计作品，也是正好赶上垃圾分类热行，所以花费两个月的时间写的一个网站来方便大家对垃圾分类经验进行交流。</p>
                        <p>网站中使用了许多网上的素材，如果有什么不妥的地方或者有什么意见，请邮箱联系本人。</p>
                        <p>email:389093147@qq.com</p>
                    </div>
                    <div style="float: right;">
                        <el-button type="primary" @click="dialogVisible = true" plain round>捐赠</el-button>
                    </div>
                </el-main>
            </el-container>
        </div>
        <el-dialog
            title="捐赠"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <span>捐赠主要用于网站的维护，感谢您的捐赠！</span>
            
            <img src="../../assets/images/about/pay1.JPG" style="width: 200px;"/>
            <img src="../../assets/images/about/pay2.JPG" style="width: 200px;margin-left: 10px;"/>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 是否显示捐赠框
            dialogVisible: false
        };
    }
}
</script>
<style scoped>
.test{
	font-family: "pinghei","Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
	font-size: 16px;
	line-height: 30px;
	font-weight: 300;
	font-style: normal;
}
</style>