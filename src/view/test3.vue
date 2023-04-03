<template>
    <div id="test3">
    <div>
        <div style="padding: 14px;"> 复制组列表 </div>
        <div class="search_input_bar"> 
        <el-input class="search_input" placeholder="请输入名字" v-model="newBrName" maxlength="15" clearable></el-input>
        <el-button type="success" @click="addBridge" plain>创建新组</el-button>
        </div>
    </div>


        <el-table
      :data="tableDataBr"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column fixed prop="index" label="ID号" >
      </el-table-column>
      <el-table-column prop="name" label="名字"> </el-table-column>
      <el-table-column prop="ipv4" label="ipv4地址"> </el-table-column>
      <el-table-column prop="ipv6" label="ipv6地址"> </el-table-column>
      <el-table-column prop="mac" label="mac地址"> </el-table-column>
      <!--
      <el-table-column prop="vlan" label="vlan"> </el-table-column>
      -->

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="selBridge(scope.row)" type="success" size="small">选择</el-button>
          <el-button @click="delBridge(scope.row)" type="danger" size="small">删除</el-button>
          
        </template>
      </el-table-column>
    </el-table>

    <el-divider></el-divider>

    <div>
        <div style="padding: 14px;"> 组 {{ currentBr }} 地址以及端口列表： </div>
       
        <el-row>
          <el-col :span="6">
            <div class="search_input_bar"> 
            <el-input class="search_input" placeholder="IP格式: 192.168.5.1/24" v-model="ipv4" maxlength="15" clearable></el-input>
            <el-button type="warning" @click="setBrIp" plain>设置IPV4</el-button>
            </div>
          </el-col>
          <el-col :span="6">
            <el-select v-model="selport" placeholder="请选择端口">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item">
            </el-option>
          </el-select>
          <el-button type="success" @click="addPort2Bridge" plain>添加端口</el-button>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>
    </div>

    <el-table
      :data="tableDataPort"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column fixed prop="index" label="ID号" >
      </el-table-column>
      <el-table-column prop="alias" label="名字"> </el-table-column>
      <el-table-column prop="ipv4" label="ipv4地址"> </el-table-column>
      <el-table-column prop="ipv6" label="ipv6地址"> </el-table-column>
      <el-table-column prop="mac" label="mac地址"> </el-table-column>
      <!-- 
      <el-table-column prop="vlan" label="vlan"> </el-table-column>
        -->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="removePort(scope.row)" type="danger" size="mini">从组内移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    </div>
</template>
<script>
export default {
    name: 'test3',
    //组件创建
    created() {
    },
   
    data() {
        return{
          newBrName: "",
          currentBr: "[无]",
            tableDataBr: [
                // {
                // index: "-1",
                // name: "br0-sample",
                // },
        
            ],

            tableDataPort: [
                // {
                // index: "1",
                // name: "br0",
                // ipv4: "192.168.0.1/24",
                // ipv6: "::1",
                // mac: "a099-000-000",

                // },
                
            ],
            options: [
            ],

            selport: "",
            ipv4: ""
        }
    },

    mounted(){

        this.freshBrList();
    },
    methods:{
      tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 0) {
                return "warning-row";
            } else if (rowIndex % 2 === 1) {
                return "success-row";
            }
        },
        freshBrList(){
          this.$rpc.brlist().then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                          
                           this.tableDataBr = data.ports
                           console.log(data.ports)
                          
                        } else {
                            this.$message("获取组列表失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("获取组列表失败：" + data.des)

                }
            })
            .catch(error => {
                    console.error(error);
                    this.$message("获取组列表失败：" + data.des)
           })
          //this.$router.push("/home")
        },
        addBridge(){
          this.$rpc.bradd(this.newBrName).then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                          
                           this.tableDataBr = data.ports
                          
                        } else {
                            this.$message("获取组列表失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("获取组列表失败：" + data.des)

                }
            })
        },
        delBridge(row){
          this.$rpc.brdel(row.name).then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                          
                           this.tableDataBr = data.ports
                           this.tableDataPort = []
                           this.currentBr = "[无]"
                           this.ipv4 = ""
                          
                        } else {
                            this.$message("获取组列表失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("获取组列表失败：" + data.des)

                }
            })
        },
        freshPortlist(){
          if (this.currentBr== ""){
            this.tableDataPort =[]
            return
          }
          this.$rpc.brportlist(this.currentBr).then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                          
                           this.tableDataPort = data.ports
                          
                        } else {
                            this.$message("获取组端口列表失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("获取组端口列表失败：" + res.status)

                }
            })
        },
        selBridge(row){
          this.currentBr = row.name;
          this.ipv4 = row.ipv4;

          this.freshPortlist()

          this.getOptions();
        },

        getOptions(){
          this.$rpc.allportlist().then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                          
                          this.options = []
                           for(var i = 0; i < data.ports.length; i++){
                              //console.log(data.ports[i])
                              var temp = {value: data.ports[i].name, label: data.ports[i].alias}
                              console.log(temp)
                              if (data.ports[i].br == ""){
                                this.options.push(temp)
                              }
                             
                           }
                          
                        } else {
                            this.$message("获取组端口列表失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("获取组端口列表失败：" + res.status)

                }
            })

        },
        // 为桥设置IP
       
        setBrIp(){

          if (this.currentBr == "[无]"){
            this.$message("请先选择组!" )
            return
          }
          if (this.ipv4 == ""){
            this.$message("请填写复制组的IP地址，格式为：192.168.5.1/24" )
          }
          // 验证IP是否合法
          var ret  = this.$rpc.checkIp(this.ipv4)
          console.log(ret)
          if (false == ret.ok){
            this.$message(ret.info)
            return 
          }

          this.$rpc.brsetip(this.currentBr, this.ipv4).
  
                    then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                                   
                          this.$message("完成设置IP" + data.des)
                          this.freshBrList();
                          
                        } else {
                            this.$message("获取组端口列表失败：" + data.des)
                        }
                    })
          
               
            
          

        },
        // 添加端口到桥中
        addPort2Bridge(){

          if (this.currentBr == "[无]"){
            this.$message("请先选择组!" )
            return
          }

          if (this.selport == ""){
            this.$message("请选择一个空闲端口！" )
            return
          }

          console.log(this.selport)
          this.$rpc.addport2br(this.currentBr, this.selport.value).then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                          
                          this.$message("成功完成添加端口" + this.selport.label + "到组 " + this.currentBr)
                          
                        } else {
                            this.$message("获取组端口列表失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("获取组端口列表失败：" + res.status)

                }
            })

            this.getOptions();
            this.selport= ""
            this.freshPortlist()

        },

        // 从桥上删除端口
        removePort(row){
          if (this.currentBr == "[无]"){
            this.$message("请先选择组!" )
            return
          }
          var portAlias = row.alias
          this.$rpc.removeport(this.currentBr, row.name).then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                          
                          this.$message("成功完程移除端口" + portAlias + "，从组 " + this.currentBr)
                          
                        } else {
                            this.$message("获取组端口列表失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("获取组端口列表失败：" + res.status)

                }
            })

            this.getOptions();
            this.selport= ""
            this.freshPortlist()

        }, //
        
    }
}
</script>
<style lang="less" scoped>
</style>