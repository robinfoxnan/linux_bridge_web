<template>
    <div id="wellcome">
        欢迎使用本流量镜像设备。<br/>
        <br/>
        下面简要介绍几种典型应用模式
        <br/>
        <!--
        <img width="400px" height="400px" src="../assets/page1.png" style="border-radius: 5px">
        -->
        <el-carousel trigger="click" :interval="60000" height="250px" arrow="always">

            <el-carousel-item v-for="item in carouselList" :key="item">
                
                <el-image         
                :src="item" 
                style="position:absolute;top:0;bottom:0;left:0;right:0;width:100%;margin:auto;" 
                fit="contain"></el-image>
 
            </el-carousel-item>

        </el-carousel>
        
        <br/><br/>
        设置步骤<br/><br/>
       1. 新建复制组，将多个端口添加到同一个复制组；<br/>
       （复制组内各个端口共享流量，即无需设置输入输出即可实现流量的复制输出与流量汇聚。）<br/><br/>
       2. 如果需要过滤掉多余的数据，可以在规则页面，针对单个端口设置流入与流出规则。
       


        <span class="descript"> </span><br/><br/>

        <span class="descript"> 
        </span>
    </div>
</template>
<script>
export default {
    //name :"欢迎",
    
    data() {
        return {
            carouselList:[
                require("../assets/page1.png"),
                require("../assets/page2.png"),
                require("../assets/page3.png"),
                ] ,
        };
    },
    
   

    //组件创建
    created() {
    },
    mounted(){
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>

.descript {
    font-size: 15px;
    color: #242323;
  }

  /deep/.el-carousel__item img{
     height: 250px;
	 max-width: 700px;
  }
  /deep/.el-carousel__item{
	  text-align: center;
  }
  /deep/.el-carousel__container {
      height: 250px;
  }

</style>