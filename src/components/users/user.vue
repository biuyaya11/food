<template>
  <div class="employee">
    <!--    查询、重置-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item >
        <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="find" icon="el-icon-search"></el-button>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="addEmployee">+添加员工</el-button>
      </el-form-item>
    </el-form>

    <!--    （当前页数-1）*每页条数， 当前页数*每页条数-->
    <!--    <el-table :data="tableData.slice((currentPage-1) * pageSize, currentPage * pageSize)" border style="width: 100%">-->
    <el-table :data="compData" border style="width: 100%">
      <el-table-column prop="name" label="员工姓名" align="center"></el-table-column>
      <el-table-column prop="username" label="账号" align="center"></el-table-column>
      <el-table-column prop="state_text" label="状态" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope = "scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
<!--新增表单-->
    <el-dialog :title="flag ? '添加员工信息' : '修改员工信息'" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="账号" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber" :label-width="formLabelWidth" placegolder="输入身份证">
          <el-input v-model="form.idNumber" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeInfo('form')">取 消</el-button>
        <el-button type="primary" @click="sure('form')">确 定</el-button>
      </div>
    </el-dialog>
<!--    分页-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {employee, employeeDel, info} from "@/api/api";

export default {
  data() {
    return {
      tableData: [
          {
            name:'111',
            username:'222',
            phone:'dddd',
            state_text:'已禁用',

          }],
      currentPage: 1 ,//当前页数
      pageSize: 10,
      total: 0,
      formInline: {
        name: '',
      },
      dialogFormVisible:false,
      form: {
        username:'',
        name:'',
        sex: '1',
        phone:'',
        idNumber:'',
      },
      formLabelWidth:"80px",
      rules: {
        name: [{required: true, message: '请输入姓名'}],
        sex: [{required: true}],
        age:[{required: true, message: '请输入年龄'} ],
        address:[{required: true, message: '请输入地址'} ],
        time:[{required: true, message: '请输入时间'}],
        phone:[{required: true, message: '请输入联系方式'} ],
      },
      flag: true,
    }
  },
  created() {
    this.getData()
  },
//  分页计算,computed
  computed: {
    compData() {
      return this.tableData.slice((this.currentPage-1) * this.pageSize,  this.currentPage * this.pageSize);
    },
  },
  methods: {
    find() {
      console.log(this.formInline);
      this.getData(this.formInline);
    },
    reset() {
      console.log(this.formInline);
      this.formInline = {};
      this.getData(this.formInline);
    },
    //修改编辑
    edit(row) {
      console.log(row)
      this.form = {...row}   //做一份扩展
      this.flag = false
      this.dialogFormVisible = true

    },
    //获取数据的方法，employee为接口API
    getData(params) {
      employee(params).then(res => {
        console.log(res);
        //判断是否能正常接收，是否能封装？
        if (res.data.status ===200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
          console.log(res);
          //状态转换
          this.tableData.forEach( item => {
            item.state === 1 ? item.state_text ='已禁用' : item.state_text = '正常' ;
            // item.state === "1"
            //     ? (item.state_text ='已入学')
            //     : item.state === "2"
            //         ? (item.state_text = "未入学")
            //         : (item.state_text = "休学中");
          });
        }
      });
    },
    //val？？？？
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //删除员工信息
    del(row) {
      console.log(row);
      employeeDel(row.id).then(res => {
        console.log(res);
        if (res.data.status === 200) {
          this.$message({ message: "删除成功", type:'success'})
        }
      })
    },
    //删除信息列表数据
    // del(row) {
    //   console.log(row)
    //   this.$alert('你确定删除吗','提示',{
    //     confirmButtonText:'确定',
    //     callback: () => {
    //       infoDel(row.id).then(res => {
    //         if (res.data.status === 200) {
    //           this.getData()
    //           this.$message({message: res.data.message, type: 'success'})
    //         }
    //       })
    //     }
    //   })
    // },
    //  新增员工
    addEmployee(){
      this.form ={
        username:'',
        name:'',
        sex: '1',
        phone:'',
        idNumber:'',
      },
      this.flag = true
      this.dialogFormVisible = true;
    },
    //弹出对话框操作，取消表单
    closeInfo(form) {
      console.log(form)
      this.$refs[form].resetFields()  //去掉校验
      this.dialogFormVisible = false
    },
    //新增和修改，保存
    sure(form) {
      console.log(form,this.form);
      this.$refs[form].validate(valid => {
        if(valid) {
          console.log(form,this.form);
          if (this.flag) {
            info('post', this.form).then(res => {
              if(res.data.status === 200) {
                this.getData()
                this.dialogFormVisible = false;
                this.$message({type: 'success', message: res.data.message})
              }
            })
          } else {
            info('put',this.form).then(res => {
              if(res.data.status === 200) {
                this.getData()
                this.dialogFormVisible = false;
                this.$message({type: 'success', message: res.data.message})
              }
            })
          }

        }
      })
    },
  },
}
</script>

<style lang="less">
.employee {
  .demo-form-inline, .el-form-item {
    text-align: left;
  }
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}

</style>