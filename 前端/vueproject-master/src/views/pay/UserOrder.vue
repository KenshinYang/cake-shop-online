/**
 * 订单管理 交易订单
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>交易订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 搜索筛选 -->
    <!-- <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.machineNo" placeholder="输入交易单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="formInline.orderNo" placeholder="输入用户编号"></el-input>
      </el-form-item>
      
    
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form> -->
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="index" width="60">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.bStatus==='待收货'" size="mini" type="success" @click="confirmOrder(scope.$index, scope.row)">确认收货</el-button>
          <el-button v-if="scope.row.bStatus==='待支付'" size="mini" type="primary" @click="payOrder(scope.$index, scope.row)">支付</el-button>
          <el-button v-if="scope.row.bStatus==='待支付'" size="mini" type="warning" @click="cancelOrder(scope.$index, scope.row)">取消订单</el-button>
          <el-button v-if="scope.row.bStatus==='已取消'" size="mini" type="danger" @click="deleteOrder(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column sortable prop="bId" label="订单编号" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="bUId" label="用户编号" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="bCakeId" label="蛋糕编号" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="bStatus" label="订单状态" width="180" show-overflow-tooltip　
      :filters="OrderStatus" :filter-method="filterStatus" filter-placement="right-end"></el-table-column>
      <el-table-column sortable prop="bCakeNum" label="蛋糕数量" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="bAgeCandle" label="年龄蜡烛" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="bTableware" label="餐具数量" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="bBookTime" label="下单时间" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>{{scope.row.bBookTime|timestampToTime}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="bExpectTime" label="预定送达时间" width="140" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>{{scope.row.bExpectTime|timestampToTime}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="bCost" label="费用" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="bPayWay" label="支付方式" width="180" show-overflow-tooltip
      :filters="PayWays" :filter-method="filterPayWay" filter-placement="right-end"></el-table-column>
      
      <el-table-column prop="bNotes" label="用户备注" width="180" show-overflow-tooltip>
      </el-table-column>
      
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <!-- <el-dialog :title="title" :visible.sync="editFormVisible" width="50%" @click="closeDialog('editForm')">
      <el-form label-width="120px" :model="editForm" ref="editForm">
        <el-form-item label="蛋糕" prop="bCakeId">
          <el-select  size="small" v-model="editForm.bCakeId" placeholder="请选择" class="userRole">
            <el-option v-for="(cake,index) in cakeData" :label="cake.name" :value="cake.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="蛋糕数量" prop="bCakeNum">
          <el-input-number v-model="editForm.bCakeNum" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="年龄蜡烛" prop="bAgeCandle">
          <el-input size="small" v-model="editForm.bAgeCandle" auto-complete="off" placeholder="请输入需要的年龄蜡烛" ></el-input>
        </el-form-item>
        <el-form-item label="餐具数量" prop="bTableware">
          <el-input-number v-model="editForm.bTableware" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="预估到达时间" prop="bExpectTime">
          <el-date-picker v-model="editForm.bExpectTime" type="datetime" placeholder="请选择预期送达时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态" prop="bStatus">
          <el-select  size="small" v-model="editForm.bStatus" placeholder="请选择" class="userRole">
            <el-option v-for="(status,index) in OrderStatus" :label="status.test" :value="status.value" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { OrderDelete, GetOrderByUserId,payById,cancelById,confirmById} from '@/api/payMG.js'
import {CakeList,} from "@/api/basisMG.js"
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      cakeData:[],//蛋糕信息
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '预览',
      // editForm: {
      //   bId: '',
      //   bUId: '',
      //   bCakeId: '',
      //   bCakeNum: '',
      //   bAgeCandle: '',
      //   bTableware: '',
      //   bBookTime: '',
      //   bExpectTime: '',
      //   bCost: '',
      //   bPayWay: '',
      //   bStatus: '',
      //   bNotes:'',
      // },

      //表单验证
      // rules: {
      //   bCakeId: [
      //     { required: true, message: '请选择蛋糕', trigger: 'blur' }
      //   ],
      //   bCakeNum: [
      //     { required: true, message: '请输入蛋糕数量', trigger: 'blur' }
      //   ],
      //   bAgeCandle: [
      //     { required: true, message: '请输入需要的年龄蜡烛', trigger: 'blur' }
      //   ],
      //   bTableware: [
      //     { required: true, message: '请输入餐具数量', trigger: 'blur' }
      //   ],
      //   bStatus: [
      //     { required: true, message: '请选择订单状态', trigger: 'blur' }
      //   ],
      // },

      //订单状态
      OrderStatus:[
        {
        text: '已取消',
        value: '已取消'
        },
        {
        text: '未支付',
        value: '未支付'
        },
        {
        text: '已支付',
        value: '已支付'
        },
        {
        text: '发货中',
        value: '发货中'
        },
        {
        text: '已送达',
        value: '已送达'
        },
      ],

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

      formInline: {
        page: 1,
        limit: 10,
        uid:'',
      },
      // 删除部门
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },

      listData: [], //订单数据
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
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.formInline.uid=(JSON.parse(localStorage.getItem('userdata'))).uid;
    console.log('uid:'+this.formInline.uid);
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    //时间格式转换
    //状态筛选
    filterStatus(value,row){
      return row.bStatus === value;
    },

    //支付方式筛选
    filterPayWay(value,row){
      return row.bPayWay === value;
    },
    // 获取公司列表
    getdata(parameter) {
      this.loading = true

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */

      GetOrderByUserId(parameter)
        .then(res => {
          this.loading = false
          if (res.success == false) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.listData = res.data
            console.log("length:"+this.listData.length)
            // 分页赋值
            this.pageparm.currentPage = this.formInline.page
            this.pageparm.pageSize = this.formInline.limit
            this.pageparm.total = res.count
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('订单信息加载失败，请稍后再试！')
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
      this.getdata(this.formInline)
    },
    //显示编辑界面
    // handleEdit: function(index, row) {
    //   this.editFormVisible = true;
    //   this.loading=true;
    //   GetOrderById(row.bId).then(res=>{
    //     this.loading=false;
    //     this.editForm=res.data;
    //   });
    //   CakeList().then(res=>{
    //     this.cakeData=res.data;
    //     console.log(this.cakeData);
    //   })
    // },
    // // 编辑、增加页面保存方法
    // submitForm(editData) {
    //   this.$refs[editData].validate(valid => {
    //     if (valid) {
    //       ConfigSave(this.editForm)
    //         .then(res => {
    //           this.editFormVisible = false
    //           this.loading = false
    //           if (res.success) {
    //             this.getdata(this.formInline)
    //             this.$message({
    //               type: 'success',
    //               message: '订单信息保存成功！'
    //             })
    //           } else {
    //             this.$message({
    //               type: 'info',
    //               message: res.msg
    //             })
    //           }
    //         })
    //         .catch(err => {
    //           this.editFormVisible = false
    //           this.loading = false
    //           this.$message.error('订单信息保存失败，请稍后再试！')
    //         })
    //     } else {
    //       return false
    //     }
    //   })
    // },
    // 删除公司
    deleteOrder(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          OrderDelete(row.bId)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '订单已删除!'
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
              this.$message.error('订单信息删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    payOrder(index, row) {
      this.$confirm('确定要支付吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          payById(row.bId)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '订单已支付!'
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
              this.$message.error('支付失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消支付'
          })
        })
    },

    cancelOrder(index, row) {
      this.$confirm('确定要取消吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          cancelById(row.bId)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '订单已取消!'
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
              this.$message.error('取消失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消取消操作'
          })
        })
    },

    confirmOrder(index, row) {
      this.$confirm('确定货物已到达吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          confirmById(row.bId)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '收货成功'
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
              this.$message.error('收货失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消收货'
          })
        })
    },
    // 关闭编辑、增加弹出框
    // closeDialog(formName) {
    //   this.editFormVisible = false
    // }
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

 
 

 