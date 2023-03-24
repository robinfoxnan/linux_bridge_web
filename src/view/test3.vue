<template>
    <div id="test3">
    <div>
        <div style="padding: 14px;"> 网桥列表 </div>
        <div class="search_input_bar"> 
        <el-input class="search_input" placeholder="请输入名字" v-model="newBrName" maxlength="15" clearable></el-input>
        <el-button type="success" plain>创建桥</el-button>
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
      <el-table-column prop="vlan" label="vlan"> </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="success" size="small">选择</el-button>
          <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
          
        </template>
      </el-table-column>
    </el-table>

    <el-divider></el-divider>

    <div>
        <div style="padding: 14px;"> 网桥 {{ currentBr }} 地址以及端口列表： </div>
       
        <el-row>
          <el-col :span="6">
            <div class="search_input_bar"> 
            <el-input class="search_input" placeholder="请输入新IP: 192.168.5.1/24" v-model="ipv4" maxlength="15" clearable></el-input>
            <el-button type="warning" plain>设置IPV4</el-button>
            </div>
          </el-col>
          <el-col :span="6">
            <el-select v-model="selport" placeholder="请选择端口">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="success" plain>添加端口</el-button>
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
      <el-table-column prop="name" label="名字"> </el-table-column>
      <el-table-column prop="ipv4" label="ipv4地址"> </el-table-column>
      <el-table-column prop="ipv6" label="ipv6地址"> </el-table-column>
      <el-table-column prop="mac" label="mac地址"> </el-table-column>
      <el-table-column prop="vlan" label="vlan"> </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="danger" size="mini">移除</el-button>
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
    mounted(){
    },
    data() {
        return{
          newBrName: "",
          currentBr: "br0",
            tableDataBr: [
                {
                index: "1",
                name: "br0",
                },
                {
                index: "3",
                name: "br3",
                },
            ],

            tableDataPort: [
                {
                index: "1",
                name: "br0",
                ipv4: "192.168.0.1/24",
                ipv6: "::1",
                mac: "a099-000-000",

                },
                {
                index: "3",
                name: "br3",
                },
            ],
            options: [{
              value: 'eth0',
              label: 'eth0'
            }, {
              value: 'eth1',
              label: 'eth1'
            }, {
              value: 'eth2',
              label: 'eth2'
            },
            ],

            selport: "",
            ipv4: ""
        }
    },
    methods:{
      tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 0) {
                return "warning-row";
            } else if (rowIndex % 2 === 1) {
                return "success-row";
            }
        },
    }
}
</script>
<style lang="less" scoped>
</style>