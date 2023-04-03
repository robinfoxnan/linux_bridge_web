<template>
    <div id="test2">
        <el-row>
        
        <el-col :span="6">
          
          <el-button type="success" @click="handleNew" plain>添加规则</el-button>
          </el-col>

          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
        </el-row>
          <!-- 这里设置表 -->
          <el-table :data="tableDataBrRule" border
      style="width: 100%"
      :row-class-name="tableRowClassName">
       
      <el-table-column fixed prop="line" label="行号" >
      </el-table-column>
      
      <el-table-column prop="alias" label="端口名"> </el-table-column>
      <el-table-column prop="direction" label="方向"> </el-table-column>
      <el-table-column prop="source" label="源地址"> </el-table-column>
      <el-table-column prop="dest" label="目的地址"> </el-table-column>
      <el-table-column prop="physsport" label="源端口"> </el-table-column>
      <el-table-column prop="physdport" label="目的端口"> </el-table-column>
      <el-table-column prop="prot" label="协议"> </el-table-column>
      <el-table-column prop="action" label="动作"> </el-table-column>
      
      <!--
      <el-table-column prop="action" label="动作"> </el-table-column>
-->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)"  type="warning" size="small">编辑</el-button>
          
          <el-button @click="handleDel(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div>
    <!-- 测试对话框Form按钮 
    <el-button type="text" @click="dialogFormVisible = true">打开Dialog</el-button>
    -->
    <!-- Form -->
    <el-dialog title="定义端口流向与规则" :visible.sync="dialogFormVisible" width="50%">
    <el-form :model="form">
        <el-form-item label="选择网口" :label-width="formLabelWidth" >
        <el-select v-model="form.selport" placeholder="请选择端口" :disabled="form.isEdit">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="流向" :label-width="formLabelWidth">
        <el-select v-model="form.direction" placeholder="请选择流向">
        <el-option label="流入" value="in"></el-option>
        <el-option label="流出" value="out"></el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="协议" :label-width="formLabelWidth">
        <el-select v-model="form.proto" placeholder="请选择协议">
        <el-option label="all" value="all"></el-option>
        <el-option label="tcp" value="tcp"></el-option>
        <el-option label="udp" value="udp"></el-option>
        <el-option label="icmp" value="icmp"></el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="源地址" :label-width="formLabelWidth">
        <el-input v-model="form.sip"  class="search_input"  placeholder="空 或者 0.0.0.0/0" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="目的地址" :label-width="formLabelWidth">
        <el-input v-model="form.dip" class="search_input" placeholder="空 或者 0.0.0.0/0" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="源端口" :label-width="formLabelWidth">
        <el-input v-model="form.sport" class="search_input" type="number" placeholder="0" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="目的端口" :label-width="formLabelWidth">
        <el-input v-model="form.dport" class="search_input" type="number" placeholder="0" autocomplete="off"></el-input>
        </el-form-item>


        

        <el-form-item label="动作" :label-width="formLabelWidth">
        <el-select v-model="form.action" placeholder="请选择动作">
        <el-option label="丢弃" value="DROP"></el-option>
        <el-option label="放行" value="ACCEPT"></el-option>
        </el-select>
        </el-form-item>

        <el-form-item   label="追加/插入位置" :label-width="formLabelWidth">
        <el-input v-model="form.line" :disabled="form.isEdit" class="search_input"  placeholder="空为追加，数字1~n插入" autocomplete="off"></el-input>
        </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRule">确 定</el-button>
    </div>
    </el-dialog>
    </div>

    </div>
</template>
<script>

export default {
    name: 'test5',
    //组件创建
    created() {
    },
    mounted(){
      this.refreshPort();
      this.refreshTable();
    },
    data() {
        return{
            dialogFormVisible: false,
            form: {
              selport: "", // 对话框返回的接口 
              sip: '',
              dip: '',
              sport: 0,
              dport: 0,
              proto: 'tcp',
              action:"ACCEPT",
              direction: "out",
              line : "",
              isNew: true,
            },
            formLabelWidth: '120px',
            options: [
            //   {
            //   value: 'eth0',
            //   label: 'eth0'
            // }, 
    
            ],
            
      

            tableDataBrRule: [
                // {       
                // line: 1,
                // alias: "br0",
                // sip: "192.168.0.1/24",
                // dip: "any",
                // sport: 0,
                // dport: 0,
                // proto: "tcp",
                // action: "丢弃",
                // direction:"流出"

                // },
          
            ],
        }
    },
    methods:{
        tableRowClassName({ row, rowIndex }) {
            row.id = rowIndex
            // if (rowIndex % 2 === 0) {
            //     return "warning-row";
            // } else if (rowIndex % 2 === 1) {
            //     return "success-row";
                
            // }
            if (row.target === "ACCEPT"){
              return "success-row";
            }else{
              return "warning-row";
            }
        },

        refreshPort(){
          this.$rpc.allportlist().then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        this.options = []
                        if (data.state == 'ok') {
                            for(var i = 0; i < data.ports.length; i++){
                                if (data.ports[i].br == ""){
                                    
                                }
                                else{
                                    //data.ports[i].show = false
                                    var item = {value: data.ports[i].name,
                                              label: data.ports[i].alias}
                                    this.options.push(item);
                                    
                                }
                            }

                            console.log(this.options);
                          
                           this.tableDataPort = data.ports
                           console.log(data.ports)
                          
                        } else {
                            this.$message("获取端口列表失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("获取端口列表失败：" + data.des)

                }
            })

        },

        refreshTable(){
          this.$rpc.listBrRules().then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                            for(var i = 0; i < data.rules.length; i++){

                              if (data.rules[i].physin != ""){
                                data.rules[i].direction = "流入";
                                if (data.rules[i].alias == ""){
                                  data.rules[i].alias = data.rules[i].physin;
                                }

                              }else if (data.rules[i].physout != ""){
                                data.rules[i].direction = "流出";
                                if (data.rules[i].alias == ""){
                                  data.rules[i].alias = data.rules[i].physout;
                                }
                              }
                              
                              if (data.rules[i].target == "ACCEPT"){
                                data.rules[i].action = "放行";
                              }else if (data.rules[i].target == "DROP"){
                                data.rules[i].action = "丢弃";
                              }
                                
                                
                            }
                          
                           this.tableDataBrRule = data.rules
                           console.log(data.rules)
                          
                        } else {
                            this.$message("获取规则列表失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("获取规则列表失败：" + data.des)

                }
            })
            .catch(error => {
                    console.error(error);
                    this.$message("遇到失败：" + data.des)
           })
        },

        // 对话框点击确定按钮后
        saveRule(){
          var rule = {
            line :this.form.line,
            pkts: "",
            bytes:"",
            target: this.form.action,
            prot: this.form.proto,
            opt: "--",
            InDev:"*",
            OutDev: "*",
            source: this.form.sip,
            dest: this.form.dip,
            hasPhys: true, 
            physin : "",
            physout: "",
            physsport: this.form.sport,
            physdport: this.form.dport,
            teegw: ""
          }

          // 检查网口
          if (this.form.selport == ""){

            this.$message("请选择一个端口，并确定流向");
            return
          }

          // 这里检查IP地址是否合法
          if (this.form.sip != "" && this.form.sip != "0.0.0.0/0"){
              var ret = this.$rpc.checkIp(this.form.sip);
            if (!ret.ok){
              this.$message("源地址格式错误：" + ret.info)
              return;
            }
          }

          if (this.form.dip != "" &&  this.form.dip != "0.0.0.0/0"){
            ret = this.$rpc.checkIp(this.form.dip);
          if (!ret.ok){
            this.$message("目的地址格式错误：" + ret.info)
            return;
          }
          }

          
          
          if (rule.physdport == 0){
            rule.physdport = "";
          }else {
            rule.physdport = rule.physdport.toString()
          }

          if (rule.physsport == 0){
            rule.physsport = "";
          }else {
            rule.physsport = rule.physsport.toString()
          }

          // 只有这2个协议才有端口号
          if (rule.prot != "tcp" && rule.prot != "udp"){
            rule.physsport = "";
            rule.physdport = "";
          }

          if (this.form.direction == "in"){
            rule.physin = this.form.selport.value

          }else if (this.form.direction == "out"){
            rule.physout = this.form.selport.value
          }else{
            this.$message("数据流向不对")
            return ;
          }
          console.log(rule);

          // 这里区别是新增还是编辑
          if (!this.form.isEdit){
            this.addRule(rule)
          }else{
            this.editRule(rule)
          }
          
          console.log(rule)

        },
////////////////////////////////////////////////
//     处理点击按钮动作
        handleNew(){
            this.form =  {
              selport: "", // 对话框返回的接口 
              sip: '',
              dip: '',
              sport: 0,
              dport: 0,
              proto: 'tcp',
              action:"ACCEPT",
              direction: "out",
              line : "",
              isEdit: false,
            };
            this.dialogFormVisible = true;

        },
        handleEdit(row) {
          var index = row.id
            var rule = this.tableDataBrRule[index]
            console.log(rule);
            this.form =  {
              selport: "",
              sip: rule.source,
              dip: rule.dest,
              sport: rule.physsport,
              dport: rule.physdport,
              proto: rule.prot,
              action:rule.target,
              direction: "",
              line : rule.line,
              isEdit: true,
            };
             if (rule.direction == "流入"){
              this.form.direction = "in"
              this.form.selport = {value: rule.physin}
             }else{
              this.form.direction = "out"
              this.form.selport = {value: rule.physout}
             }


            this.dialogFormVisible = true;   
        },
        handleDel(row) {
            var index = row.id
            var rule = this.tableDataBrRule[index]
            console.log(rule);
            //this.dialogFormVisible = true;
            this.$rpc.delBrRule(rule).then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                            
                           this.$message("删除规则完成。")
                           this.refreshTable()
                           console.log(data.rules)
                          
                          
                        } else {
                            this.$message("删除规则遇到错误：" + data.des)
                            this.refreshTable()
                           console.log(data.rules)
                     
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("删除规则遇到错误：" + data.des)

                }
            }).catch(error => {
                    console.error(error);
                    this.$message("遇到失败：" + data.des)
           })

        },
        /////////////////////////////////////
        // 添加或者更改

        addRule(rule){
          this.$rpc.addBrRule(rule).then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                            
                           this.$message("添加规则完成。")
                           this.refreshTable()
                           console.log(data.rules)
                           this.dialogFormVisible = false;
                          
                        } else {
                            this.$message("添加规则遇到错误：" + data.des)
                            this.refreshTable()
                           console.log(data.rules)
                          // this.dialogFormVisible = false;
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("添加规则遇到错误：" + data.des)

                }
            }).catch(error => {
                    console.error(error);
                    this.$message("遇到失败：" + data.des)
           })
        },

        editRule(rule){
          this.$rpc.editBrRule(rule).then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        console.log(data.state)
                        if (data.state == 'ok') {
                          
                           this.$message("更改规则完成。行号" + rule.line)
                           this.dialogFormVisible = false;
                           this.refreshTable()
                          
                           
                          
                        } else {
                            this.$message("更改规则遇到错误：" + data.des)
                            this.dialogFormVisible = false;
                            this.refreshTable()
                            //console.log(data.rules)
                            
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("更改规则遇到错误：" + data.des)

                }
            })
            .catch(error => {
                    console.error(error);
                    this.$message("遇到失败：" + data.des)
           })
        },

        
    }
}
</script>
<style lang="less" scoped>

.search_input{
    border: 1px solid #DBDBDB;
    border-radius: 2px 0 0 2px;
    height: 40px;
    width: 220px;
    line-height: 30px;
    padding: 0px 0px;
    box-sizing: border-box;
}

</style>