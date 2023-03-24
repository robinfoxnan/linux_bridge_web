# 1. 在Vue程序中添加后端服务

有不同的方法，下面是其中两种常见的方法：

通过 Axios 调用后端服务
Axios 是一个常用的 JavaScript 库，可以用于发送 HTTP 请求。使用 Axios 可以在 Vue 程序中轻松调用后端服务。首先需要在 Vue 项目中安装 Axios，可以使用 npm 或 yarn 命令进行安装：

```bash

npm install axios
```
# 或
```
yarn add axios
```
安装完成后，在 Vue 组件中引入 Axios，并使用它发送 HTTP 请求。以下示例演示如何在 Vue 组件中使用 Axios 发送 GET 请求：

```vue

<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
    };
  },
  mounted() {
    axios.get('/api/hello')
      .then(response => {
        this.message = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>
```
上述示例中，使用 Axios 发送一个 GET 请求到 /api/hello 路径，并将响应数据赋值给 Vue 组件的 message 属性。

使用 Vue CLI 生成的项目搭建 Express 服务器
如果您的 Vue 程序使用 Vue CLI 生成，并且您希望在同一项目中添加后端服务，可以使用 Vue CLI 提供的插件生成 Express 服务器。以下是如何在 Vue CLI 生成的项目中使用插件添加 Express 服务器的示例：

```bash

# 安装 Express 服务器插件
npm install -D express-generator-api

# 创建 Express 服务器
npx express-generator-api server
```
执行以上命令会在当前目录下创建一个名为 server 的目录，其中包含一个 Express 服务器。在 Vue CLI 生成的项目中，可以使用 ProxyTable 配置将前端请求代理到 Express 服务器中，以下是示例配置：

```javascript

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
};
```
上述配置会将以 /api 开头的请求代理到 Express 服务器中，其中 target 属性的值是 Express 服务器的地址。您可以在 Vue 组件中使用相对路径发送请求，例如：

```vue

<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    };
  },
  mounted() {
    this.$http.get('/api/hello')
      .then(response => {
        this.message = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>
```
上述示例中，使用 $http 对象发送请求到 /api/hello 路径。Vue CLI 会将请求代理到 Express 服务器中，并将响应数据返回给 Vue 组件。

 # 2. vue能否将ajax请求转发到其他端口的服务上

   是的，Vue可以将AJAX请求转发到其他端口的服务上，这通常通过配置Vue开发服务器的代理来实现。

   Vue开发服务器可以通过在`vue.config.js`中进行配置来启用代理。下面是一个示例vue.config.js文件，其中配置了将AJAX请求代理到另一个端口为3000的本地服务器上：

```javascript

   module.exports = {
     devServer: {
       proxy: {
         '/api': {
           target: 'http://localhost:3000',
           changeOrigin: true,
           pathRewrite: {
             '^/api': ''
           }
         }
       }
     }
   }
```
   这里使用proxy属性配置了代理，将以/api开头的所有请求转发到`http://localhost:3000`的服务器上。changeOrigin属性设置为true，以便正确设置host请求头。pathRewrite属性指定了一个函数，用于重写请求路径。

   在上述示例中，如果Vue组件发送以下请求：

```javascript
Copy code
this.$http.get('/api/data')
```
   则该请求将被转发到	下面路径上。

```
http://localhost:3000/data
```
​	

   需要注意的是，为了使代理配置生效，您需要使用vue-cli-service来启动开发服务器。在命令行中运行以下命令即可启动开发服务器：

```bash

npm run serve
```
   启动开发服务器后，Vue应用程序将在默认端口8080上运行，同时代理将转发到另一个端口为3000的本地服务器上。

# 3.  vue.config.js语法

`vue.config.js` 是 Vue CLI 3+ 项目中的一个配置文件，用于配置项目构建和打包的相关选项和参数。下面是一些常见的选项和语法：

publicPath: 设置公共路径，即访问静态资源的基础 URL。默认值为 /。示例：

```js

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-project/'
    : '/'
}
```
outputDir: 设置构建输出目录。默认值为 dist。示例：

```javascript

module.exports = {
  outputDir: 'my-dist'
}
```
assetsDir: 设置静态资源目录，相对于 outputDir。默认值为 ''。示例：

```javascript

module.exports = {
  assetsDir: 'my-assets'
}
```
devServer: 设置开发服务器选项。示例：

```javascript

module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
```
configureWebpack 和 chainWebpack: 可以用来自定义 webpack 配置。示例：

```javascript

module.exports = {
  configureWebpack: {
    plugins: [
      new MyPlugin()
    ]
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        // 修改 options
        return options
      })
  }
}
```
其中，此次proxy很重要，因为后端是使用golang写的。

下面示范路径映射：

在 Vue.js 中，pathRewrite 选项用于重写请求路径，可以对路径进行替换、删除等操作，常用于接口代理时对请求路径的修改。

pathRewrite 选项的值是一个对象，该对象的键值对表示需要重写的规则。键表示需要匹配的路径，值表示重写的规则。例如：

```javascript
Copy code
pathRewrite: {
  '^/api': ''
}
```
上面的规则表示将请求路径中的 /api 替换为空字符串，例如将 /api/user 重写为 /user。

下面是另一个例子，可以将请求路径中的 /api 替换为另一个字符串，例如将 /api/user 重写为 /v1/user：

```javascript
Copy code
pathRewrite: {
  '^/api': '/v1'
}
```
上面的规则表示将请求路径中以 /api 开头的部分替换为 /v1，例如将 /api/user 重写为 /v1/user。

还可以使用正则表达式进行更加灵活的匹配和替换。例如，下面的规则可以将请求路径中的 /api/ 替换为空字符串：

```javascript
Copy code
pathRewrite: {
  '^/api/(.*)': '/$1'
}
```
上面的规则使用了正则表达式，将请求路径中以 /api/ 开头的部分替换为 /，例如将 /api/user 重写为 /user。

需要注意的是，如果使用了 pathRewrite 选项，同时在请求路径中使用了查询参数，那么查询参数也需要在重写规则中进行处理。例如，下面的规则可以将请求路径中的 /api/user?id=123 替换为 /user?id=123：

```javascript
Copy code
pathRewrite: {
  '^/api': ''
}
```
