/**
 * 基础菜单 商品管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>


    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.name" placeholder="输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.description" placeholder="输入商品描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column sortable prop="id" label="商品主键" width="100">
      </el-table-column>
      <el-table-column sortable prop="name" label="商品名称" width="120">
      </el-table-column>
      <el-table-column sortable prop="description" label="商品描述" width="120">
      </el-table-column>
      <el-table-column sortable prop="size" label="商品尺寸" width="120">
      </el-table-column>
      <el-table-column sortable prop="price" label="商品价格" width="150">
      </el-table-column>
      <el-table-column sortable prop="tastyName" label="口味" width="120">
      </el-table-column>
      <el-table-column sortable prop="shapeName" label="形状" width="150">
      </el-table-column>
      <el-table-column sortable prop="storeyName" label="层数" width="120">
      </el-table-column>
      <el-table-column sortable prop="pictureLocation" label="图片位置" width="120">
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteCake(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    
    <!-- 商品浏览 -->
    <!-- <el-row gutter=10>
      <el-col v-for="(cake,index) in 2" :key="index" span=12>
        <el-card>
          
          <el-row>
            <img class="CakeImg" src="@/assets/img/Cakes/ChiffonCake.jpg"/>
            <span>蛋糕描述</span>
            <div>
              <p>价格</p>
              <el-button type="danger"></el-button>
            </div>
          </el-row>
          
        </el-card>
      </el-col>
    </el-row> -->
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>

    

    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="商品名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input size="small" v-model="editForm.description" auto-complete="off" placeholder="请输入商品描述"></el-input>
        </el-form-item>
        <el-form-item label="商品尺寸" prop="size">
          <el-input size="small" v-model="editForm.size" auto-complete="off" placeholder="请输入商品尺寸"></el-input>
        </el-form-item>
       
        <el-form-item label="商品价格" prop="price">
          <el-input size="small" v-model="editForm.price" auto-complete="off" placeholder="请输入商品价格"></el-input>
        </el-form-item>

        <el-form-item label="口味分类" prop="tasteId">
          <el-select size="small" v-model="editForm.tasteId"  placeholder="请选择" class="userRole">
            <el-option v-for="(taste,index) in tasteList"
            :key="index"
            :value="taste.id"
            :label="taste.tasteName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="形状分类" prop="shapeId">
          <el-select size="small" v-model="editForm.shapeId"  placeholder="请选择" class="userRole">
            <el-option v-for="(shape,index) in shapeList"
            :key="index"
            :value="shape.id"
            :label="shape.shapenName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="层数分类" prop="layerId">
          <el-select size="small" v-model="editForm.layerId"  placeholder="请选择" class="userRole">
            <el-option v-for="(layer,index) in layerList"
            :key="index"
            :value="layer.id"
            :label="layer.layerName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片位置" prop="pictureLocation">
          <!-- <el-input size="small" v-model="editForm.pictureLocation"  auto-complete="off" placeholder="请输入商品图片位置"></el-input> -->
          <el-upload
            action="#" :file-list="fileList" accept=".jpg,.png,.jpeg"
            list-type="picture-card" :on-change="OnChange"
            :auto-upload="false" :multiple="false" :limit="1">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <el-image
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt="" :fit="'scale-down'"
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
              </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>

    //预览图
    <el-dialog v-model="dialogVisible" style="line-height: 0;">
      <img style="width: 100%;height: 100%"  :src="uploadImgUrl" alt="" />
    </el-dialog>

  </div>
</template>

<script>
// import { deptList, deptSave, deptDelete } from '../../api/userMG'
import {CakeList,CakeSave,CakeDelete,GetCakeById,getCakeByLike,
  LayerList,TasteList,ShapeList
} from "@/api/basisMG.js"
import Pagination from '@/components/Pagination.vue'
import Axios from 'axios'
export default {
  data() {
    return {
      dialogVisible: false,
      uploadImgFile: null,
      uploadImgUrl:'',
      tasteList:[],
      shapeList:[],
      layerList:[],
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {
        id: '',
        name: '',
        description: '',
        size: '',
        price: '',
        tasteId: '',
        shapeId: '',
        layerId: '',
        pictureLocation:''
      },
      // rules表单验证
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
        size: [{ required: true, message: '请输入商品尺寸', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        tasteId: [{ required: true, message: '请选择口味分类', trigger: 'blur' }],
        shapeId: [{ required: true, message: '请选择形状分类', trigger: 'blur' }],
        layerId: [{ required: true, message: '请选择层数分类', trigger: 'blur' }],
       pictureLocation:[{ required: true, message: '请选择商品图片', trigger: 'blur' }],
      },
      formInline: {
        page: 1,
        limit: 10,
        name: '',
        description: '',
      },
      fileList:[],
      listData: [], //商品数据
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
    Pagination,
  },
  /**
   * 数据发生改变
   */

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
    OnChange(file,fileList){
      console.log('onchange');
      this.uploadImgUrl=file.url;
      let fd = new FormData();
      fd.append('file', file.raw);
      fd.append('fileName',file.name);
      console.log('filename:'+file.name);
      this.editForm.pictureLocation=file.name;
      Axios.post('/api/cake-web/cake/uploadFile', fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        //上传成功后返回的数据,
        console.log("上传图片到:"+response.data.data);
        // 将图片地址给到表单.
      })
    },
    //预览图片
    handlePictureCardPreview(file) {
      console.log(file.url);
      this.dialogVisible = true
      this.uploadImgUrl = file.url
 
    },

    //模糊查询
    getDataByLike(parameter){
      this.loading = true
      console.log("获取蛋糕模糊信息");

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      //获取用户列表
      getCakeByLike(parameter).then(res => {
        this.loading = false
        console.log("信息返回");
        if (res.success == false) {
          console.log("获取蛋糕模糊信息失败");
          this.$message({
            type: 'info',
            message: res.msg
          })
        } else {
          console.log("获取蛋糕模糊信息成功");
          this.listData = res.data
          console.log(this.listData);
          // 分页赋值
          this.pageparm.currentPage = this.formInline.page
          this.pageparm.pageSize = this.formInline.limit
          this.pageparm.total = res.count
        }
      })
    },

    // 获取商品列表
    getdata(parameter) {
      console.log("parameter:page="+parameter.page+" size:"+parameter.limit);
      console.log(parameter);
      this.loading = true

      //系统提供的方法
     CakeList(parameter)
        .then(res => {
          this.loading = false
          if (res.success == false) {  //查询失败
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {  //查询成功
            this.listData = res.data
            // 分页赋值
            this.pageparm.currentPage = this.formInline.page
            this.pageparm.pageSize = this.formInline.limit
            this.pageparm.total = res.count
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('商品信息加载失败，请稍后再试！')
        })
    },

    
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件
    search() {
      this.getDataByLike(this.formInline)
    },


    //显示编辑界面
    handleEdit: function(index, row) {
      
      console.log("编辑");
      if (row != undefined && row != 'undefined') {
        this.title = '修改'

        //根据商品主键查询指定的商品信息
        GetCakeById(row.id).then(res=>{
          this.editForm=res.data; //将查询的结果赋值给editForm中的各成员变量
          console.log("editForm："+res.data);
        });
        

      } else {
        this.title = '添加'
        this.editForm.id='';
        this.editForm.name='';
        this.editForm.description='';
        this.editForm.size='';
        this.editForm.price='';
        this.editForm.tasteId='';
        this.editForm.shapeId='';
        this.editForm.layerId='';
        this.editForm.pictureLocation='';
      }
      LayerList().then(res=>{
        this.layerList=res.data;
        console.log("layerList"+res.data);
      });
      TasteList().then(res=>{
        this.tasteList=res.data;
        console.log("tasteList"+res.data);
      });
      ShapeList().then(res=>{
        this.shapeList=res.data;
        console.log("shapeList"+res.data);
      });
      this.editFormVisible = true
    },


    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => { //表单验证
        if (valid) {
          CakeSave(this.editForm)
            .then(res => {
              this.editFormVisible = false //关闭添加，编辑页面
              this.loading = false //不显示加载
              if (res.success) {  //添加，编辑成功
                this.getdata(this.formInline)  //分页查询商品信息
                this.$message({  //弹框显示保存成功
                  type: 'success',
                  message: '商品保存成功！'
                })
              } else {  //添加，编辑失败
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('商品保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除商品
    deleteCake(index, row) {
      console.log("index:"+index);
      console.log(row);
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          CakeDelete(row.id)  //执行删除功能，将商品主键作为参数传入
            .then(res => {
              if (res.success) { //删除成功，给出提示弹框
                this.$message({
                  type: 'success',
                  message: '商品已删除!'
                })
                this.getdata(this.formInline)  //分页查询商品信息
              } else { 
                this.$message({  //删除失败，将后台返回的提示信息弹框显示
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('商品删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    }
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
.CakeImg{
  width: 300px;
  height: auto;
}
</style>

 
 