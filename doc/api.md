# 流量复制器后端接口

## 1. 概述

接口路径格式为

```
/api/v1/...
```

端口默认使用8154，

服务配置使用config.yaml

各种数据初步使用JSON，便于发现问题；各种json文件存储到data目录

- /data/user/[用户名] .json  admin
- /data/ports.json 这个主要是用来配置默认有多少个端口可以用；再加一个默认的桥；这个文件默认是不改的；只读，在设备出厂时候配置；
- /data/ports_conf.json 这个文件是用户加在port以及桥上的规则；
- /data/ns.json 将添加的ns都放置到里面，并记录在此空间下配置的各种信息，包括端口，
- /data/br_ruls.json
- /data/map_rules.json

 后续是否需要考虑使用levelDB?

接口命名规则：[分类]+[动作]

## 2. 注册登录接口

目前V1版本只支持一个用户，admin，默认口令为admin

这里可以使用明文，如果考虑到安全，可以加一个私有证书，然后启用HTTPS

### 2.1 注册

为了防止被攻击，还是应该手机号或者邮箱来注册。这个设备不用注册；

地址：/regist



### 2.2  登录

地址：/login

方法：get

```json
http://localhost:8888/api/v1/login?name=robin&pwd=admin
```

流程：

从文件中比对内容；

结果

```
{
	"state": "ok",
	"des": "",
}
```



### 2.3 更改口令

地址：/useredit

方法：post

参考上一个；



## 3. 命名空间接口



### 3.1 列出所有空间

地址：/nslist

备注：返回时候添加默认的空间，

### 3.2 新建立空间

地址：/nsadd

### 3.3 进入某个空间

地址：/nsenter

### 3.4 查看当前在哪个空间

地址：/nswhich

3.5 移除空间

地址：/nsdel

## 4. 桥接口

### 4.1 获取桥列表 

备注：默认至少有一个桥，br0

地址：地址：/brlist

```json
{
"state" : "ok",
"list": [
"br0",
"br1"
]
}
```

### 4.2 更改桥地址

地址：/bredit

### 4.3 删除桥

地址：/brdel

### 4.4 添加桥

地址：/bradd 



### 4.5 列出桥下属端口

地址：/brlistport



## 5. 端口管理

### 5.1 列出所有端口

地址：/portlist

### 5.2 更改地址

地址：/portip

### 5.3 更改网关

地址：/portgw

### 5.4 创建端口（veth pair)

地址：/portaddveth

### 5.5 移除端口（veth pair)

地址：/portdelveth

### 5.6 更改命名空间

地址：/portmovens



## 6.  桥规则

### 6.1 列出所有规则

备注，这里列出规则，同时记录iptables中的行号，便于后续删除

地址：/brruleslist

### 6.2 编辑规则

地址：/brrulesedit



### 6.3 删除规则

地址：/brrulesdel

### 6.4 添加规则

地址：/brrulesadd



## 7. 路由规则管理

### 7.1列出所有的规则

地址：/mapruleslist



### 7.2 添加一个规则

地址：/maprulesadd

### 7.3 编辑一个规则

地址：/maprulesedit

### 7.4 删除一个规则

地址：/maprulesdel





## 8. 备注信息