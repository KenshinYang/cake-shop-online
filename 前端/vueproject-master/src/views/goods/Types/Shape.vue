/**
 * 系统管理 形状分类管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>形状分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="">
        <el-input size="small" v-model="formInline.id" placeholder="输入分类主键"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" @selection-change="selectChange" :data="shapeData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="id" label="分类主键" width="95">
      </el-table-column>
      <el-table-column align="center" prop="shapenName" label="分类名称" width="120"></el-table-column>
      <el-table-column label="操作" min-width="160" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteShape(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="分类名称" prop="shapenName">
          <el-input size="small" v-model="editForm.shapenName" auto-complete="off" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    
    
  </div>
</template>

<script>
// 导入请求方法
import {
  ShapeList,
  ShapeSave,
  ShapeDelete,
  GetShapeById,
} from '@/api/basisMG.js'
import Pagination from '@/components/Pagination.vue'
export default {
  data() {
    return {
      loading: false, //是显示加载
      title: '添加形状分类',
      editFormVisible: false, //控制编辑页面显示与隐藏

      // 编辑与添加
      editForm: {
        id: '',
        shapenName: '',
      },
      
      // rules表单验证
      rules: {
        shapenName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
      },
 
      // 用户下线
      offline: {
        token: localStorage.getItem('logintoken')
      },
      // 请求数据参数
      formInline: {
        page: 1,
        limit: 10,
        id:'',
      },
      //层数数据
      shapeData: [],

      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  // 注册组件
  components: {
    Pagination
  },

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取数据方法
    getdata(parameter) {
      this.loading = true
      console.log("获取形状信息");

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      //获取用户列表
      ShapeList(parameter).then(res => {
        this.loading = false
        console.log("信息返回");
        if (res.success == false) {
          console.log("获取形状信息失败");
          this.$message({
            type: 'info',
            message: res.msg
          })
        } else {
          console.log("获取层数信息成功");
          this.shapeData = res.data
          console.log(this.shapeData);
          // 分页赋值
          this.pageparm.currentPage = this.formInline.page
          this.pageparm.pageSize = this.formInline.limit
          this.pageparm.total = res.count
        }
      })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    //搜索事件
    search() {
      console.log("search");
      GetShapeById(this.formInline.id).then(res=>{
        console.log("taste:"+res.data);
        let Shape=res.data;
        this.shapeData=[];
        this.shapeData.push(Shape);
      });
    },

    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      console.log("编辑层数分类");
      this.loading=true;
      
      if (row != undefined && row != 'undefined') {
        this.title = '修改层数分类'
        GetShapeById(row.id).then(res=>{
          this.loading=false;
          this.editForm=res.data;
        });
        
      } else {
        this.title = '添加形状分类'
        this.editForm.id = ''
        this.editForm.shapenName = ''
        this.loading=false;
      }
    },
    // 编辑、添加提交方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          ShapeSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '数据保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },

    // 选择复选框事件
    selectChange(val) {
      this.selectdata = val
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      }
    },
    // 删除用户
    deleteShape(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          ShapeDelete(row.id)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '数据已删除!'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('数据删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    },
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>