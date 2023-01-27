<template>
   <div class="addNew">
     <div class="btn">
       <el-button type="primary" class="continue" @click="addClass('class')">新增菜品分类</el-button>
       <el-button type="primary" @click="addClass('meal')">新增套餐分类</el-button>
     </div>

     <el-table :data="compData" border style="width: 100%"  :default-sort = "{prop: 'updateTime', order: 'descending'}">
    <el-table-column prop="name" label="分类名称" align="center" :formatter="formatter"></el-table-column>
    <el-table-column prop="type" label="分类类型" align="center" :formatter="formatter" >
      <template slot-scope="scope">
        <span>{{ scope.row.type == '1' ? '菜品分类': '套餐分类' }}</span>
      </template>
    </el-table-column>
     <el-table-column prop="updateTime" label="操作时间" align="center" sortable>
       <template slot-scope="scope">
         {{scope.row.updateTime}}
       </template>
     </el-table-column>
    <el-table-column prop="sort" label="排序" align="center" sortable></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope = "scope">
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>

     <!--新增表单-->
     <el-dialog  :title="classData.title" :visible.sync="dialogFormVisible" width="500px">
       <el-form  class="demo-form-inline" :model="classData"  ref="classData">
         <el-form-item label="分类名称" :label-width="formLabelWidth" prop="username">
           <el-input v-model="classData.name" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="排序" :label-width="formLabelWidth" prop="name">
           <el-input v-model="classData.sort" type="number" autocomplete="off"></el-input>
         </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="closeInfo('form')">取 消</el-button>
         <el-button type="primary" @click="submitForm( )">确 定</el-button>
         <el-button v-if="action !='edit' " class="continue" type="primary" @click="submitForm('go')">保存并继续添加</el-button>
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
import {addCategory, deleCategory, editCategory, getCategoryPage} from "@/api/category";

export default {
  data() {
    return {
      action:'',
      pageSize: 10,
      total: 0,
      page: 1,
      tableData: [],
      state: true,
      dialogFormVisible:false,
      //新增表单分类？
      classData: {
        'title':'添加菜品分类',
        'categoryId': '',
        'name': '',
        sort: ''
      },
    }
  },
  //？？？？？？
  computed: {},
  created() {
    this.init()
  },
  mounted() {
  },
  //???????
  methods: {
    //初始化？？
    async init () {
      await getCategoryPage({'page': this.page, 'pageSize': this.pageSize}).then(res => {
        if (String(res.code) === '1') {
          this.tableData = res.data.records
          this.total = Number(res.data.total)
        } else {
          this.$message.error(res.msg || '操作失败')
        }
      }).catch(err => {
        this.$message.error('请求出错了：' + err)
      })
    },
    //??????????页码
    handleQuery() {
      this.page = 1;
      this.init();
    },
    //？？？？？？？？？
    //添加
    addClass(st) {
      if (st =='class'){
        this.classData.title = '新增菜品分类'
        this.type = '1'
      } else {
        this.classData.title = '新增套餐分类'
        this.type= '2'
      }
      this.action ='add'
      this.classData.name = ''
      this.classData.sort = ''
      this.dialogFormVisible = true
    },
    //编辑
    edit(dat){
      this.classData.title = '修改分类'
      this.action = 'edit'
      this.classData.name = dat.name
      this.classData.sort = dat.name
      this.classData.id = dat.id
      this.dialogFormVisible = true
    },
    //弹出对话框操作，取消表单
    closeInfo() {
      this.dialogFormVisible = false
    },
  //  删除
    del(id){
      this.$confirm('删除，是否继续？','提示', {
        'confirmButtonText': '确定',
            'cancelButtonText': '取消',
            'type': 'warning'
      }).then(()=>{
        deleCategory(id).then(res=> {
          if (res.code === 1) {
            //res.data.status === 200
            this.$message.success('成功')
          //  这里需要修改页码！！
            this.handleQuery()
          } else {
            this.$message.error(res.msg || '操作失败')
          }
        }).catch(err => {
          this.$message.error('请求出错了'+ err)
        })
      })
    },
    //数据提交
   submitForm(st) {
      const classData = this.classData
      const valid = (classData.name === 0 || classData.name) && (classData.sort === 0 || classData.sort)
     if(this.action === 'add') {
       if (valid) {
         const reg = /^\d+$/
         if (reg.test(classData.sort)) {
           addCategory({
            'name':classData.name,'type':this.type,  sort: classData.sort}).then(res => {
              console.log(res)
             if (res.code === 1) {
               this.$message.success('分类添加成功')
               if (!st) {
                 this.dialogFormVisible = false
               } else {
                 this.classData.name =''
                 this.classData.sort =''
               }
             //  页数
               this.handleQuery()
             } else {
               this.$message.error(res.msg || '操作失败')
             }
           }).catch(err => {
             this.$message.error('错误' +err)
           })
         } else {
           this.$message.error('只能输入数字类型')
         }
       } else {
         this.$message.error('输入分类名称或排序')
       }
     } else if(valid) {
       const reg = /^\d+$/
       if (reg.test(this.classData.sort)) {
         editCategory({'id': this.classData.id, 'name': this.classData.name, sort: this.classData.sort}).then(res => {
           if (res.code === 1) {
             this.$message.success('分类修改成功！')
             this.dialogFormVisible = false
             this.handleQuery()
           } else {
             this.$message.error(res.msg || '操作失败')
           }
         }).catch(err => {
           this.$message.error('请求出错了：' + err)
         })
       } else {
         this.$message.error('排序只能输入数字类型')
       }
     }else {
       this.$message.error('请输入分类名称或排序')
     }
   },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.page = val
      this.init()
    },

    //  table排序
    formatter(row, column) {
      return row.sort;
    }
  }
}
</script>

<style scoped>
.btn{
  text-align: right;
}
</style>