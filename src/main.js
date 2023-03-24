import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'
// 引入全局样式
import './assets/css/global.css'
// 引入字体图标
import 'font-awesome/css/font-awesome.min.css'
import rpc from './store/rpc.js';



Vue.prototype.$rpc = rpc;

Vue.use(ElementUI)

Vue.config.productionTip = false

/////////////////////////////
// let hasLogin = false // 是否登录过
// // 登录拦截
// router.beforeEach((to, from, next) => {
//     if (document.cookie.includes('userName')) {
//         hasLogin = true
//         // if (permission.indexOf(to.path) > -1) {
//         //     next()
//         // } else {
//         //     try {
//         //         // 简单的权限判断
//         //         let routesKey = Cookie.get('routesKey').split(',')
//         //         let key = to.path.split('/')[1]
//         //         if (routesKey.indexOf(key) > -1) {
//         //             next()
//         //         } else {
//         //             next({path: '/'})
//         //         }
//         //     } catch (e) {
//         //         next({path: '/login'})
//         //     }
//         // }
//     } else {
//         if (to.path === '/login') { // 如果是登录页面路径，就直接next()
//             next()
//         } 
//         else {
//             if (hasLogin) {
//                 Cookie.clear('userName')
//                 this.$message({
//                     message: '登录失效,请重新登录!',
//                     center: true,
//                     type: 'warning'
//                 })
//             }
//             next({path: '/login', query: {redirect: to.fullPath}})
//         }
//     }
// })

///////////////////////////
new Vue({
  router,
  store,  //store:store 和router一样，将创建的Vuex实例挂载到这个vue实例中
  render: h => h(App),
  //rpc: new RPC('http://example.com/rpc'),
}).$mount('#app')


