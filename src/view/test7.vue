<template>
    <div id="test7">
        <el-card>
            授权信息
        </el-card>

        <el-card>
            当前授权： {{ expiredate }}
        </el-card>
        <el-card>
            申请码： {{ reqdata }}
        </el-card>

        <div class="search_input_bar"> 
        <el-input  
        type="textarea"
        :rows="6"
        
        placeholder="请输入新的授权码" v-model="lisence"  clearable></el-input>
        <span>&nbsp;</span>
        <el-button type="primary" plain @click="handleUpdate">更新授权</el-button>
        </div>

    </div>
</template>
<script>
export default {
    name: 'test7',
    //组件创建
    created() {
    },
    mounted(){
        this.getLisenceData();
    },
    data() {
        return{
            reqdata: "123",
            expiredate: "2023-01-03",
            lisence : "",
        }
    },
    methods:{
        handleUpdate(){
            this.$rpc.updateLisence(this.lisence).then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                            this.$message("更新授权信息成功：" + data.des)
                           this.reqdata = data.req;
                           this.expiredate = data.date2;

                        } else {
                            this.$message("遇到错误：" + data.des);
                            this.reqdata = data.req;
                           this.expiredate = data.date2;

                           console.log(data.rules)
                     
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("遇到错误：" + data.des)

                }
            }).catch(error => {
                    console.error(error);
                    this.$message("遇到失败：" + data.des)
           })
        },
        getLisenceData(){
            this.$rpc.getLisence().then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                            
                           this.reqdata = data.req;
                           this.expiredate = data.date2;

                        } else {
                            this.$message("遇到错误：" + data.des)

                           console.log(data.rules)
                     
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("遇到错误：" + data.des)

                }
            }).catch(error => {
                    console.error(error);
                    this.$message("遇到失败：" + data.des)
           })
        },
    }
}
</script>
<style lang="less" scoped>
.lisence_input{
    border: 1px solid #DBDBDB;
    border-radius: 2px 0 0 2px;
    height: 240px;
    width: 50%;
    line-height: 30px;
    padding: 0px 0px;
    box-sizing: border-box;
}

</style>