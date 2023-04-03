<template>
    <div id="test4">
        
           <span>网口列表</span> 
       

        <el-table :data="tableDataPort" border style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column fixed prop="index" label="ID号">
            </el-table-column>
            <el-table-column prop="alias" label="名字"> </el-table-column>
             <!--
            <el-table-column prop="ipv4" label="ipv4地址"> </el-table-column>
            <el-table-column prop="ipv6" label="ipv6地址"> </el-table-column>
            -->
            <el-table-column prop="mac" label="mac地址"> </el-table-column>
            <el-table-column prop="br" label="所属组"> </el-table-column>
              <!--
            <el-table-column prop="gw" label="网关"> </el-table-column>
            -->
            <!--
            <el-table-column  label="操作" width="200">
                <template v-if="scope.row.show"  slot-scope="scope">
                    
                    <el-button  @click="handleChangeIp(scope.row)" type="text" size="small">更改地址</el-button>
                     
                    <el-button @click="handleClick(scope.row)" type="text" size="small">移动到命名空间</el-button>
                    
                    <el-button @click="handleDelIp(scope.row)" type="text" size="small">清除地址</el-button>
                   
                </template>
            </el-table-column>
             -->
        </el-table>


        <div>
            <!-- 测试对话框Form按钮 
            <el-button type="text" @click="dialogFormVisible = true">打开Dialog</el-button>
            -->
            <!-- Form -->
            <el-dialog title="网口IP设置" :visible.sync="dialogFormVisible" width="50%">

                <el-form :model="form">

                    <el-form-item label="当前网口:" :label-width="formLabelWidth">
                        {{ form.info }}
                    </el-form-item>

                    <el-form-item label="IPV4地址/掩码" :label-width="formLabelWidth">
                        <el-input v-model="form.ipv4" class="search_input" placeholder="格式为：0.0.0.0/24"
                            autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="网关地址/掩码" :label-width="formLabelWidth">
                        <el-input v-model="form.gwip" class="search_input" placeholder="格式为：0.0.0.0/24"
                            autocomplete="off"></el-input>
                    </el-form-item>



                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="setPortIp">确 定</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>
<script>
export default {
    name: 'test4',
    //组件创建
    created() {
    },
    mounted() {
        this.freshPortList()
    },
    data() {
        return {
            dialogFormVisible: false,
            form: {
                info: "无选中",
                ipv4: '',
                gwip: '',
                port: ""
            },
            formLabelWidth: '120px',

            tableDataPort: [
                // {
                //     index: "1",
                //     name: "br0",
                //     ipv4: "192.168.0.1/24",
                //     ipv6: "::1",
                //     mac: "a099-000-000",
                //     master: "",
                //     gw: "192.168.1.2/30"

                // },
                // {
                //     index: "3",
                //     name: "br3",
                // },
            ],
        }
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 0) {
                return "warning-row";
            } else if (rowIndex % 2 === 1) {
                return "success-row";
            }
        },
        handleDelIp(row){

        },
        // 设置IP
        handleChangeIp(row) {
    
            console.log(row);
            if (row.br != ""){
                this.$message("复制组内的端口不能设置IP地址")
                return 
            }
            
            this.form.ipv4 = row.ipv4;
            this.form.gwip = row.gw;
            this.form.port = row.name;
            this.form.info = row.alias;
            this.dialogFormVisible = true; 
        },
        setPortIp(){
            var ret = this.$rpc.checkIp(this.form.ipv4)
            if (false == ret.ok){
                this.$message("IP校验错误：" + ret.info);
                return ;
            }

            ret = this.$rpc.checkIp(this.form.gwip)
            if (false == ret.ok){
                this.$message("网关校验错误：" + ret.info);
                return 
            }

            this.$rpc.setportIp(this.form.port, this.form.ipv4, this.form.gwip).then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                            this.$message("更新地址成功！")
                            this.dialogFormVisible = false;
                            this.freshPortList();
                        } else {
                            this.$message("更新地址失败：" + data.des)
                        }
                    })
                } else {
                    console.log(res.status);
                    this.$message("更新地址失败：" + data.des)

                }
            })


        },

        freshPortList(){
            this.$rpc.allportlist().then((res) => {
                if (res.ok) {//如果取数据成功
                    res.json().then((data) => {
                        //转化为json数据进行处理
                        console.log(data);
                        if (data.state == 'ok') {
                            for(var i = 0; i < data.ports.length; i++){
                                if (data.ports[i].br == ""){
                                    data.ports[i].show = true
                                }
                                else{
                                    data.ports[i].show = false
                                }
                            }
                          
                           this.tableDataPort = data.ports
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
        }
    }
}
</script>
<style lang="less" scoped>
.search_input {
    border: 1px solid #DBDBDB;
    border-radius: 2px 0 0 2px;
    height: 40px;
    width: 220px;
    line-height: 30px;
    padding: 0px 0px;
    box-sizing: border-box;
}
</style>