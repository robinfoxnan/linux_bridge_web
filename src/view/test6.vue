<template>
    <div id="test6">
        <el-row>
        
        <el-col :span="6">
          
          <el-button type="success" @click="dialogFormVisible = true" plain>添加规则</el-button>
          </el-col>

          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
        </el-row>
          <!-- 这里设置表 -->

         <!-- 这里设置表 -->
         <el-table :data="tableDataRule" border
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column fixed prop="id" label="行号" >
      </el-table-column>
      <el-table-column fixed prop="inport" label="入端口" >
      </el-table-column>
      <el-table-column prop="outport" label="出端口"> </el-table-column>
      <el-table-column prop="sip" label="源地址"> </el-table-column>
      <el-table-column prop="dip" label="目的地址"> </el-table-column>
      <el-table-column prop="sport" label="源端口"> </el-table-column>
      <el-table-column prop="dport" label="目的端口"> </el-table-column>
      <el-table-column prop="proto" label="协议"> </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)"  size="small">编辑</el-button>
            <el-button @click="handleDel(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div>
    <!-- 测试对话框Form按钮 
    <el-button type="text" @click="dialogFormVisible = true">打开Dialog</el-button>
    -->
    <!-- Form -->
    <el-dialog title="定义复制流量规则" :visible.sync="dialogFormVisible" width="50%">
    <el-form :model="form">
        <el-form-item label="选择入网口" :label-width="formLabelWidth">
        <el-select v-model="selport1" placeholder="请选择端口">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择出网口" :label-width="formLabelWidth">
        <el-select v-model="selport2" placeholder="请选择端口">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="源地址" :label-width="formLabelWidth">
        <el-input v-model="form.sip"  class="search_input"  placeholder="any or 0.0.0.0/24" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="目的地址" :label-width="formLabelWidth">
        <el-input v-model="form.dip" class="search_input" placeholder="any or 0.0.0.0/24" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="源端口" :label-width="formLabelWidth">
        <el-input v-model="form.sport" class="search_input" type="number" placeholder="0" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="目的端口" :label-width="formLabelWidth">
        <el-input v-model="form.dport" class="search_input" type="number" placeholder="0" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="协议" :label-width="formLabelWidth">
        <el-select v-model="form.proto" placeholder="请选择协议">
            <el-option label="any" value="any"></el-option>
        <el-option label="tcp" value="tcp"></el-option>
        <el-option label="udp" value="ucp"></el-option>
        <el-option label="icmp" value="icmp"></el-option>
      </el-select>
        </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
    </el-dialog>
    </div>

    </div>
</template>
<script>
export default {
    name: 'test6',
    //组件创建
    created() {
    },
    mounted(){
    },
    data() {
        return{
            dialogFormVisible: false,
            form: {
            sip: 'any',
            dip: 'any',
            sport: 0,
            dport: 0,
            proto: 'tcp',
            },
            formLabelWidth: '120px',
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

            tableDataRule: [
                {
                    line: 1,
                inport: "eth0",
                outport: "eth1",
                sip: "any",
                dip: "any",
                sport: 0,
                dport: 0,
                proto: "any",

                },
                {
                    line: 6,
                    inport: "eth0",
                outport: "eth2",
                sip: "192.168.0.5/24",
                dip: "any",
                sport: 0,
                dport: 0,
                proto: "tcp",
                },
            ],
        }
    },
    methods:{
        tableRowClassName({ row, rowIndex }) {
            row.id = rowIndex + 1
            if (rowIndex % 2 === 0) {
                return "warning-row";
            } else if (rowIndex % 2 === 1) {
                return "success-row";
            }
        },

        handleEdit(row){
            console.log(row);
            this.dialogFormVisible = true;
        },
        handleDel(row){
            console.log(row.line);
            for (let i = 0; i < this.tableDataRule.length; i++) {
                if (this.tableDataRule[i].line === row.line) {
                    console.log("find it ");
                    this.tableDataRule.splice(i, 1);
                    break;
                }
            }
        }
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