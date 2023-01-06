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
export default {
  data() {
    return {
      pageSize: 10,
      total: 0,
      tableData: [],
      state: true,
      dialogFormVisible:false,
      //新增表单分类？
      classData: {

        'categoryId': '',
        'name': '',
        sort: ''
      },
    }
  },
  methods: {
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
      this.classData.dialogVisible = true

    },
    //弹出对话框操作，取消表单
    closeInfo() {
      this.dialogFormVisible = false
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