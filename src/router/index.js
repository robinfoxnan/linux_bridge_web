import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Wellcome from '@/components/wellcome.vue'


import Test2 from '@/view/test2.vue'
import Test3 from '@/view/test3.vue'
import Test4 from '@/view/test4.vue'
import Test5 from '@/view/test5.vue'
import Test6 from '@/view/test6.vue'
import Test7 from '@/view/test7.vue'



// 引入加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 配置
NProgress.inc()
NProgress.configure({     
    easing: 'ease',  // 动画方式    
    speed: 800,  // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.1 // 初始化时的最小百分比
})

Vue.use(VueRouter)

// 所有人都可以访问
const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login, meta: {title: '登录'}},
    // 访问home时，重定向到wellcome页
    { path: '/home', 
        name: 'home', 
        component: Home, 
        redirect: '/wellcome', 
        meta: 
        {
            title: '主页面', 
            requireLogin:true,
            }, 
        children: [
        { path: '/wellcome', name: 'wellcome', component: Wellcome, meta: {title: '主页面'}}, 
        { path: '/test2', name: 'test2', component: Test2, meta: {title: '命名空间'}}, 
        { path: '/test3', name: 'test3', component: Test3, meta: {title: '测试页面3'}},
        { path: '/test4', name: 'test4', component: Test4, meta: {title: '测试页面4'}},
        { path: '/test5', name: 'test5', component: Test5, meta: {title: '测试页面5'}},
        { path: '/test6', name: 'test6', component: Test6, meta: {title: '测试页面6'}},
        { path: '/test7', name: 'test7', component: Test7, meta: {title: '测试页面7'}},
        ] 
       
    },
]

const router = new VueRouter({
  routes
})

function isEmpty(obj) {
    if (typeof obj === 'undefined' || obj == null || obj === '') {
      return true;
    } else {
      return false;
    }
  };

function checkLogin(){
    var name = localStorage.getItem('username');
    console.log(name)
    if (isEmpty(name)) {
      return false
    }
      return true
  };

/**
 * 挂载路由守卫
 * to 代表将要访问的路径
 * from 代表从哪个路径跳转而来
 * next 是一个函数，next() 放行。   next('/login') 强制跳转
 */
router.beforeEach((to, from, next) => {
    // 加载条
    NProgress.start()
    console.log(to)
    if (to.path == "/login"){
        //放行
        next() 

    }else if (checkLogin()){
        //放行
        console.log("已经登录")
        next()     

    }else{
        console.log("未登录")
        next({path:'/login'})
    }

})


// 挂载路由守卫 - 访问结束
router.afterEach(() => {
    // 关闭加载条
    NProgress.done()
})

export default router
