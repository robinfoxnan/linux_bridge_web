<template>
  <div id="test2">
   
    <div style="padding: 14px;"> 当前命名空间：{{ currentNs }}  </div>
    
    
    <div class="search_input_bar"> 
    <el-input class="search_input" placeholder="请输入名字" v-model="inputName" maxlength="15" clearable></el-input>
    <span>&nbsp;</span>
    <el-button type="primary" @click="nsadd" plain>创建空间</el-button>
    </div>
   
     
      
    

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column fixed prop="index" label="ID号" width="150">
      </el-table-column>
      <el-table-column prop="name" label="名字"> </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="nsdel(scope.row)" type="danger" size="small">删除</el-button>
          <el-button @click="nsenter(scope.row)" type="success" size="small">进入</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "test2",
  //组件创建
  // created() {},
  // mounted() {},
  mounted(){
    this.$rpc.getnslist().then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                           this.currentNs = data.current
                           this.tableData = []
                           for(var i = 0; i < data.names.length; i++){
                              console.log(data.names[i])
                              
                              this.tableData.push({name: data.names[i], index: i})
                           }
                          
                        } else {
                            this.$message("获取命名空间列表失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("获取命名空间列表失败：" + data.des)

                }
            })
            .catch(error => {
                    console.error(error);
                    this.$message("获取命名空间列表失败：" + data.des)
           })
          //this.$router.push("/home")
  },
  methods: {
    setData(res){
      if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                           this.currentNs = data.current
                           this.tableData = []
                           for(var i = 0; i < data.names.length; i++){
                              console.log(data.names[i])
                              
                              this.tableData.push({name: data.names[i], index: i})
                           }
                          
                        } else {
                            this.$message("获取命名空间列表失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("获取命名空间列表失败：" + data.des)

                }

    },
    nsdel(row) {
      console.log(row);
      this.$rpc.nsdel(row.name).then((res) => {this.setData(res); })
    },
    nsadd(row) {
      console.log(row);
      this.$rpc.nsadd(this.inputName).then((res) => {this.setData(res); })
    },
    nsenter(row) {
      console.log(row);
      this.$rpc.nsenter(row.name).then((res) => {this.setData(res); })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
    },
  },
  data() {
    return {
      inputName: "",
      tableData: [
        // {
        //   index: "1",
        //   name: "默认",
        // },
        // {
        //   index: "3",
        //   name: "testNs1",
        // },
      ],
      currentNs: "默认",
    };
  },
};
</script>
<style lang="less" scoped>
</style>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.search_input_bar .search_input{
    border: 1px solid #DBDBDB;
    border-radius: 2px 0 0 2px;
    height: 40px;
    width: 220px;
    line-height: 30px;
    padding: 0px 0px;
    box-sizing: border-box;
}
.search_input_bar .search_btn{
    background: #E62E2E;
    border: 0;
    border-radius: 0 2px 2px 0;
    height: 30px;
    width: 30px;
    padding: 20px 20px;
    color: #FFB3B3;
}

</style>