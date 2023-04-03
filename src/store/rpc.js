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

    checkIp(ip){
      var index = ip.lastIndexOf('/')
      var msg = ""
      if (index < 0){
        msg = "格式错误，未设置掩码，请填写复制组的IP地址，格式为：192.168.5.1/24";
        return {ok: false, info: msg}
      }
      
      var ip_ = ip.substring(0, index)
      var mask = ip.substring(index +1, ip.length)
      //console.log(ip_)
      //console.log(mask)
      var maskInt = parseInt(mask)
      if (maskInt < 8 || maskInt > 30){
        msg = "掩码长应在8-30位，请填写复制组的IP地址，格式为：192.168.5.1/24" ;
        return {ok: false, info: msg}
      }


      var re =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      var bl = re.test(ip_);
      if (!bl) {
        msg = "格式错误，请填写复制组的IP地址，格式为：192.168.5.1/24";
        return {ok: false, info: msg}
      }
      return {ok: true, info: msg}
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
          method: 'POST',//post请求
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

    async getLisence(){
      //创建一个配置
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }

       return fetch('/api/lisence', options)
 
   }

    async getnslist(){
      //创建一个配置
      let options = {
          method: 'GET',//post请求
          headers: {
          'Accept': 'application/json',
          //'Content-Type': 'application/json'
          },
        }

        let url = "/api/nslist"
        return fetch(url, options)

    }
    async nsadd(name){
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }

      let url = "/api/nsadd?name=" + name 
      return fetch(url, options)
    }

    async nsdel(name){
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }

      let url = "/api/nsdel?name=" + name 
      return fetch(url, options)
    }

    async nsenter(name){
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }

      let url = "/api/nsenter?name=" + name
      return fetch(url, options)
    }
    ///////////////////////////////////////////////////

    async brlist(){
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }

      let url = "/api/brlist"
      return fetch(url, options)
    }

    async bradd(name){
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }

      let url = "/api/bradd?name=" + name
      return fetch(url, options)
    }

    async brdel(name){
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }
      console.log(name)
      let url = "/api/brdel?name=" + name
      return fetch(url, options)
    }

    async brportlist(br){
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }
      console.log(br)
      let url = "/api/brlistport?name=" + br
      return fetch(url, options)
    }

    async brsetip(br, ip) {

      let url = "/api/bredit" 
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          
          name: br,
          ipv4: ip,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (data.error) {
        throw new Error(data.error.message);
      }
  
      return data
    }

    async allportlist(){
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }

      let url = "/api/portlist" 
      return fetch(url, options)
    }

    async addport2br(br, port){
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }

      let url = "/api/braddport?br=" + br + "&port=" + port 
      return fetch(url, options)
    }

    async removeport(br, port){
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }

      let url = "/api/brdelport?br=" + br + "&port=" + port 
      return fetch(url, options)
    }

    async setportIp(port, ip, gw){

      let url = "/api/portip" 
      let options = {
        method: 'POST',
        body: JSON.stringify({
          
          name: port,
          ipv4: ip,
          gw: gw
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      return  fetch(url, options);

    }

    async listBrRules(){
      //创建一个配置
      let options = {
        method: 'GET',//post请求
        headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        },
      }

      let url = "/api/brruleslist" 
      return fetch(url, options)

    }

    async addBrRule(rule){
      let url = "/api/brrulesadd" 
      let options = {
        method: 'POST',
        body: JSON.stringify(rule),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      return  fetch(url, options);
    }

    async delBrRule(rule){
      let url = "/api/brrulesdel" 
      let options = {
        method: 'POST',
        body: JSON.stringify(rule),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      return  fetch(url, options);
    }

    async editBrRule(rule){
      let url = "/api/brrulesedit" 
      let options = {
        method: 'POST',
        body: JSON.stringify(rule),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      return  fetch(url, options);
    }


    //////////////////////////////////////////
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
  
  const rpc = new RPC('http://localhost:8888/api/v1/');
  export default rpc;
  