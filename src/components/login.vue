<template>
    <div id="login">

        <br /><br /><br />
        <div class="login-title">
            <h1 :style="{ color: textColor, fontSize: textSize }">{{ welcomeMessage }}</h1>
        </div>




        <div class="login-container">
            <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" class="login-form">
                <h3 class="login-title">用户登录</h3>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="y_reset">重置</el-button>

                    <el-button type="primary" @click="y_login">登录</el-button>
                </el-form-item>
            </el-form>

        </div>


        <p class="login-title">Copyright © 2023 all rights reserved</p>


    </div>
</template>

<script>
export default {
    name: 'wellcome',
    //组件创建
    created() {
    },
    mounted() {
    },
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: 'admin'
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            welcomeMessage: '欢迎使用朔雪流量复制器',
            textColor: 'black',
            textSize: '24px'
        }
    },
    methods: {
        y_reset() {
            this.loginForm.username = "";
            this.loginForm.password = "";
            //this.$router.push("/home")
        },
        y_login() {
         this.$rpc.login(this.loginForm.username, this.loginForm.password).then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                            this.$rpc.setLoginOk(this.loginForm.username)
                            //this.$rpc.setLogout()
                            //console.log(this.$rpc.checkLogin())
                            this.$router.push("/home")
                            this.$message("登陆成功！欢迎使用" )
                        } else {
                            this.$message("登陆失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("登陆遇到错误：" + res.status)

                }
            })
            .catch(error => {
                    console.error(error);
                    this.$message("登陆遇到严重错误：" + error)
           })
          //this.$router.push("/home")
        }
    }
}
</script>
<style lang="less" scoped>
body,
html,
.el-container,
#app {
    height: 100%;
}

.descript {
    font-size: 15px;
    color: #242323;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.login-form {
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.login-title {
    text-align: center;
    margin-bottom: 20px;
}

/*布局容器样式 main header fotter*/
.el-header {
    background-color: deepskyblue;
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: xx-large;
    font-weight: bolder;

}

.el-footer {
    background-color: #bbb;
    color: #000;
    text-align: center;
    line-height: 60px;

}

.el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 80px;

}</style>