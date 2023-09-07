/**
 * 基础菜单 商品管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>蛋糕浏览</el-breadcrumb-item>
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
      </el-form-item>
    </el-form>
    <!--列表-->
    <!-- <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
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
      <el-table-column sortable prop="tasteId" label="口味分类" width="120">
      </el-table-column>
      <el-table-column sortable prop="shapeId" label="形状分类" width="150">
      </el-table-column>
      <el-table-column sortable prop="layerId" label="层数分类" width="120">
      </el-table-column>
      <el-table-column sortable prop="pictureLocation" label="图片位置" width="120">
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteCake(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    
    <!-- 商品浏览 -->
    <el-row :gutter="10" justify=center>
      <el-col v-for="(item,index) in listData" :key="index" :span="12">
        <el-card>        
          <!-- <el-image style="width: 100px; height: 100px" :src="require('../../assets/img/Cakes/'+item.pictureLocation)"></el-image> -->
          <el-image class="CakeImg" :src="require('@/assets/img/Cakes/'+item.pictureLocation)"></el-image>
          <!-- <img class="CakeImg" src= "../../assets/img/Cakes/CheeseCake.jpg"/> -->
          <!-- <img class="CakeImg" :src= "cake.pictureLocation"/> -->
          <!-- <img class="CakeImg" src= "@/assets/img/Cakes/AngelFoolCake.jpg"/> -->
          <div style="padding: 14px;">
            <el-row :gutter="2" class="rowItem" align="middle"> 
              <el-col :span="8">
                <div><p class="cakeName">{{item.name}}</p></div>
              </el-col>         
              <el-col :span="5" :offset="11">
                <div><p class="price">{{item.price}}元</p></div>
              </el-col>
            </el-row>
            
            <div class="bottom clearfix">
              <el-row :gutter="2" class="rowItem">
                <el-col :span="23">
                  <div><p class="description" v-text="item.description"></p></div>                 
                </el-col>
              </el-row>

              <el-row :gutter="5" class="rowItem">
                <el-col :span="6">
                  <div><el-tag type="info" class="tags">{{item.size}}寸</el-tag></div>            
                </el-col>
                <el-col :span="6">
                  <div><el-tag type="info" class="tags">{{item.tastyName}}</el-tag></div>
                </el-col>
                <el-col :span="6">
                  <div><el-tag type="info" class="tags">{{item.shapeName}}</el-tag></div>                  
                </el-col>
                <el-col :span="6">
                  <div><el-tag type="info" class="tags">{{item.storeyName}}层</el-tag></div>                   
                </el-col>
              </el-row>    

              
                                                 
            </div>
            <el-divider></el-divider>
            <el-button type="text" class="button" @click="handleEdit(item.id)">点击下单</el-button> 
          </div>         
        </el-card>
      </el-col>
    </el-row>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>

    

    <!-- 编辑订单界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="蛋糕数量" prop="bCakeNum">
          <el-input-number v-model="editForm.bCakeNum" :min="1" :max="10" @change="handleChange"></el-input-number>
        </el-form-item>
        <el-form-item label="年龄蜡烛" prop="bAgeCandle">
          <el-input size="small" v-model="editForm.bAgeCandle" auto-complete="off" placeholder="请输入需要的年龄蜡烛" ></el-input>
        </el-form-item>
        <el-form-item label="餐具数量" prop="bTableware">
          <el-input-number v-model="editForm.bTableware" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="预期送达时间" prop="bExpectTime">
          <el-date-picker v-model="editForm.bExpectTime" type="datetime" placeholder="请选择送达时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="支付方式" prop="bPayWay">
          <el-select  size="small" v-model="editForm.bPayWay" placeholder="请选择" class="userRole">
            <el-option v-for="(payway,index) in PayWays" :label="payway.test" :value="payway.value" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="bAgeCandle">
          <el-input size="small" v-model="editForm.bNotes" auto-complete="off" placeholder="请输入备注" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">提交订单</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { deptList, deptSave, deptDelete } from '../../api/userMG'
import {CakeList,GetCakeById,getCakeByLike
} from "@/api/basisMG.js"
import Pagination from '@/components/Pagination.vue'
import Template from '../../components/template.vue'
import {OrderCommit} from '@/api/payMG.js'
import{timestampToTime} from '@/utils/util.js'
export default {
  data() {
    return {
      pictureDirectory:'../../assets/img/Cakes/',
      tasteList:[],
      shapeList:[],
      layerList:[],
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {
        bId: '',
        bUId: '',
        bCakeId: '',
        bCakeNum: 1,
        bAgeCandle: '',
        bTableware: 1,
        bBookTime: '',
        bExpectTime: '',
        bCost: '',
        bPayWay: '',
        bStatus: '',
        bNotes:'',
      },

      PayWays: [
        {
        text: '支付宝',
        value: '支付宝'
        },
        {
        text: '微信支付',
        value: '微信支付'
        },
        {
        text: '云闪付',
        value: '云闪付'
        },
        {
        text: '中国建设银行',
        value: '中国建设银行'
        },
      ],
      //选中的蛋糕
      selectedCake:null,
      // rules表单验证
      rules: {
        bCakeNum: [{ required: true, message: '请输入蛋糕数量', trigger: 'blur' }],
        bTableware: [{ required: true, message: '请选择餐具数量', trigger: 'blur' }],
        bPayWay: [{ required: true, message: '请选择支付方式', trigger: 'blur' }],
        bExpectTime: [{ required: true, message: '请选择预期送达时间方式', trigger: 'blur' }],
      },
      formInline: {
        page: 1,
        limit: 2,
        name: '',
        description: '',
      },

      listData: [], //商品数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 2,
        total: 0
      }
    }
  },
  // 注册组件
  components: {
    Pagination,
    Template 
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

    handleChange(){
      console.log('num:'+this.editForm.bCakeNum)
    },

    //显示下单编辑界面
    handleEdit: function(id) {
      this.editFormVisible = true
      this.title = '订单编辑'

      console.log("订单编辑");
      //根据商品主键查询指定的商品信息
      //var selectedCake = null;
      GetCakeById(id).then(res=>{
        this.selectedCake=res.data; 
        this.editForm.bUId=(JSON.parse(localStorage.getItem('userdata'))).uid;
        console.log('uid:'+this.editForm.bUId);
        this.editForm.bCakeId=this.selectedCake.id;
        this.editForm.bBookTime = timestampToTime(new Date());
        console.log('bBookTime:'+this.editForm.bBookTime);     
        console.log('editForm:'+this.editForm);
      });
      
    },


    // 提价订单方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => { //表单验证
        if (valid) {
          console.log('expectedtime:'+this.editForm.bExpectTime);
          this.editForm.bStatus="待支付";
          this.editForm.bCost=this.selectedCake.price*this.editForm.bCakeNum;
          console.log("cost:"+this.editForm.bCost);
          console.log("editForm:" + this.editForm);
          this.loading=true;
          OrderCommit(this.editForm)
            .then(res => {
              this.editFormVisible = false //关闭添加，编辑页面
              this.loading = false //不显示加载
              if (res.success) {  //添加，编辑成功
                this.getdata(this.formInline)  //分页查询商品信息
                this.$message({  //弹框显示保存成功
                  type: 'success',
                  message: '订单保存成功！'
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
              this.$message.error('订单信息保存失败，请稍后再试！')
            })
        } else {
          return false
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
            console.log("res.data:"+res.data); //输出数据
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

    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false;
      this.editForm.bStatus='';
      this.editForm.bPayWay='';
      this.editForm.bAgeCandle='';
      this.editForm.bCakeNum=1;
      this.editForm.bTableware=1;
      this.editForm.bExpectTime='';
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
  width: 500px;
  height: 300px;
  display: block;
}
.bottom {
    margin-top: 13px;
    line-height: 12px;
  }

.button {
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.description {
    font-size: 20px;
    color: #3a3535;
  }

  .price{
    color: red;
    font-size: 25px;
  }

  .rowItem{
    flex-wrap: wrap;
    flex-direction: row;
  }
  .tags{
    font-size: 15px;
    width: 80%;
    text-align: center;
  }
  .cakeName{
    font-size: 25px;
    font-weight: bold;
  }
</style>

 
 