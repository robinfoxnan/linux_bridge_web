import axios from 'axios';

var Cookie = {
  set: function (key, value, exdays) {
      //校验Key, key中不能有等号【=】
      if(key.indexOf("=") !== -1) {
          throw new Error("Cookie不支持key中使用等号【=】, key:" + key)
      }
      let exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      // eslint-disable-next-line camelcase
      window.document.cookie = key + '=' + value + ';path=/;expires=' + exdate.toGMTString()
  },

  get: function (key) {
      if (document.cookie.length > 0) { 
          // 这里显示的格式需要切割一下自己可输出看下
          var arr = document.cookie.split('; ')
          for (let i = 0; i < arr.length; i++) {
              let arr2 = arr[i].split('=') // 再次切割
              // 判断查找相对应的值
              if (arr2[0] === key) {
                  var value = arr2[1];
                  for (let j = 2; j < arr2.length; j++) {
                      value += '=' + arr2[j];
                  }
                  return value;
              }
          }
      }
  },

  remove: function (key) {
      set(key, '', -1);
  }
};



class RPC {
    constructor(url) {
      this.url = url;
    }
  
    baseUrl(){
        return this.url;
    }

    async login(name, pwd){
      //创建一个配置
      let options = {
          method: 'GET',//post请求
          headers: {
          'Accept': 'application/json',
          //'Content-Type': 'application/json'
          },
        }

        let url = "/api/login?name=" + name + "&pwd=" + pwd
        return fetch(url, options)

    }

    async useredit(name, pwd){
      //创建一个配置
      let options = {
          method: 'GET',//post请求
          headers: {
          'Accept': 'application/json',
          //'Content-Type': 'application/json'
          },
        }

        let url = "/api/useredit?name=" + name + "&pwd=" + pwd
        return fetch(url, options)

    }

    

    setLoginOk(name){
      //Cookie.set("userName", name, 1);
      localStorage.setItem("username",name);
    }
    setLogout(){
      //Cookie.remove('userName')
      localStorage.removeItem('username')
    }

    isEmpty(obj) {
      if (typeof obj === 'undefined' || obj == null || obj === '') {
        return true;
      } else {
        return false;
      }
    }

    getUserName(){
      var name = localStorage.getItem('username');
      return name
    }

    checkLogin(){
      var name = localStorage.getItem('username');
      console.log(name)
      if (this.isEmpty(name)) {
        return false
      }
        return true
    }

    async updateLisence(codeParam){
       //创建一个配置
       let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({//post请求参数
        code: codeParam,
        })
        }

        //新建一个fetch请求
        return fetch('/api/lisenceupdate', options)
  
    }

    async call(method, params) {
      const response = await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify({
          method,
          params,
          id: 1,
          jsonrpc: '2.0',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (data.error) {
        throw new Error(data.error.message);
      }
  
      return data.result;
    }
  
    async getBalance(address) {
      return this.call('getBalance', [address]);
    }
  
    async transfer(to, amount) {
      return this.call('transfer', [to, amount]);
    }
  
    // add more RPC methods here
    async testCallRpc(){
        return "testCallRpc ok"
    }
  }
  
  const rpc = new RPC('http://example.com/rpc');
  export default rpc;
  