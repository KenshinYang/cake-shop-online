/**
 * 系统管理 用户管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="">
        <el-input size="small" v-model="formInline.uid" placeholder="输入用户主键"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.username" placeholder="输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.phone" placeholder="输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
        <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteUserByBatch()">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" @selection-change="handleSelectionChange" :data="userData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="uid" label="用户编号" width="95">
      </el-table-column>
      <el-table-column align="center" prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column align="center" prop="password" label="密码" width="120">
      </el-table-column>
      <el-table-column align="center" prop="realName" label="真实姓名" width="120">
      </el-table-column>
      <el-table-column align="center" prop="sex" label="性别" min-width="50"
      :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]" :filter-method="filterSex" filter-placement="right-end">
      </el-table-column>
      <el-table-column align="center" sortable prop="age" label="年龄" min-width="60">
      </el-table-column>
      <el-table-column align="center" prop="address" label="地址" min-width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="phone" label="手机号" min-width="120">
      </el-table-column>
      <el-table-column align="center" prop="roleName" label="角色" min-width="50"
      :filters="[{ text: '管理员', value: '管理员' }, { text: '普通用户', value: '普通用户' }]" :filter-method="filterRole" filter-placement="right-end">
      </el-table-column>
      <el-table-column label="操作" min-width="160" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input size="small" v-model="editForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="small" v-model="editForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input size="small" v-model="editForm.realName" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="editForm.sex" label="男">男</el-radio>
          <el-radio v-model="editForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input size="small" v-model="editForm.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input size="small" v-model="editForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input size="small" v-model="editForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="rId">
          <el-select  size="small" v-model="editForm.rId" placeholder="请选择" class="userRole">
            <el-option v-for="(role,index) in roleData" :label="role.roleName" :value="role.rId" :key="index"></el-option>
          </el-select>
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
  userList,
  userSave,
  userDelete,
  getUserById,
  roleList,
  getUserByLike
} from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      title: '添加用户',
      editFormVisible: false, //控制编辑页面显示与隐藏
      dataAccessshow: false, //控制数据权限显示与隐藏
      unitAccessshow: false, //控制所属单位隐藏与显示
      // 编辑与添加
      editForm: {
        uid: '',
        username: '',
        password: '',
        realName: '',
        sex: '',
        age: '',
        address: '',
        phone: '',
        rId: '',
        roleName: '',
      },
      
      // rules表单验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1(3\d|47|5((?!4)\d)|7(0|1|[6-8])|8\d)\d{8,8}$/,
            required: true,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        rId: [{ required: true, message: '请选择角色', trigger: 'blur' }],
      },
      // 删除用户
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      // 重置密码
      resetpsd: {
        userId: '',
        token: localStorage.getItem('logintoken')
      },
      // 用户下线
      offline: {
        token: localStorage.getItem('logintoken')
      },
      // 请求数据参数
      formInline: {
        page: 1,
        limit: 10,
        uid:'',
        username: '',
        phone: '',
      },
      //用户数据
      userData: [],
      //角色数据
      roleData: [],
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
  //批量删除所用到的
  multipleSelection: [],
  deleteIds:[],


  // 注册组件
  components: {
    Pagination
  },

  /**
   * 数据发生改变
   */
  watch: {},

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
    //性别筛选过滤器的方法
    filterSex(value,row){
      return row.sex === value;
    },

    //角色筛选过滤器的方法
    filterRole(value,row){
      return row.roleName === value;
    },
    // 获取数据方法
    getdata(parameter) {
      this.loading = true
      console.log("获取用户信息");

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      //获取用户列表
      userList(parameter).then(res => {
        this.loading = false
        console.log("信息返回");
        if (res.success == false) {
          console.log("获取用户信息失败");
          this.$message({
            type: 'info',
            message: res.msg
          })
        } else {
          console.log("获取用户信息成功");
          this.userData = res.data
          console.log(this.userData);
          // 分页赋值
          this.pageparm.currentPage = this.formInline.page
          this.pageparm.pageSize = this.formInline.limit
          this.pageparm.total = res.count
        }
      })
    },
    
    //模糊查询
    getDataByLike(parameter){
      this.loading = true
      console.log("获取用户信息");

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      //获取用户列表
      getUserByLike(parameter).then(res => {
        this.loading = false
        console.log("信息返回");
        if (res.success == false) {
          console.log("获取用户信息失败");
          this.$message({
            type: 'info',
            message: res.msg
          })
        } else {
          console.log("获取用户信息成功");
          this.userData = res.data
          console.log(this.userData);
          // 分页赋值
          this.pageparm.currentPage = this.formInline.page
          this.pageparm.pageSize = this.formInline.limit
          this.pageparm.total = res.count
        }
      })
    },
    //批量删除
    deleteUserByBatch() {
      this.deleteIds=[];
      for(let i = 0;i<this.multipleSelection.length;i++){
        this.deleteIds.push(this.multipleSelection[i].uid)
      }
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          // 删除
          console.log("-----删除------")
          console.log(this.deleteIds);
          for(let i = 0;i<this.deleteIds.length;i++){
            userDelete(this.deleteIds[i])
          }
          this.$message({
            type: 'success',
            message: '数据已删除!'
            })
            this.getdata(this.formInline)
          })
          .catch(err => {
            this.loading = false
            this.$message.error('数据删除失败，请稍后再试！')
          })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
      
    },
    handleSelectionChange(val) {
       this.multipleSelection = val;
       console.log(this.multipleSelection)  // 当前选中的某一行打印出来的结果
    },

    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    //搜索事件
    search() {
      this.getDataByLike(this.formInline)
    },
    // 修改type
    // editType: function(index, row) {
    //   this.loading = true
    //   let parm = {
    //     lock: '',
    //     userId: '',
    //     token: localStorage.getItem('logintoken')
    //   }
    //   parm.userId = row.userId
    //   let lock = row.isLock
    //   if (lock == 'N') {
    //     parm.lock = 'Y'
    //   } else {
    //     parm.lock = 'N'
    //   }
    //   // 修改状态
    //   userLock(parm).then(res => {
    //     this.loading = false
    //     if (res.success == false) {
    //       this.$message({
    //         type: 'info',
    //         message: res.msg
    //       })
    //     } else {
    //       this.$message({
    //         type: 'success',
    //         message: '状态修改成功'
    //       })
    //       this.getdata(this.formInline)
    //     }
    //   })
    // },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      console.log("编辑用户");
      this.loading=true;
      
      if (row != undefined && row != 'undefined') {
        this.title = '修改用户'
        // this.editForm.uId = row.uId
        // this.editForm.username = row.username
        // this.editForm.password = row.password
        // this.editForm.realName = row.realName
        // this.editForm.sex = row.sex
        // this.editForm.age = row.age
        // this.editForm.address = row.address
        // this.editForm.phone = row.phone
        // this.editForm.rId = row.rId
        getUserById(row.uid).then(res=>{
          this.loading=false;
          this.editForm=res.data;
        });
        
      } else {
        this.title = '添加用户'
        this.editForm.uid = ''
        this.editForm.username = ''
        this.editForm.password = ''
        this.editForm.realName = ''
        this.editForm.sex = ''
        this.editForm.age = ''
        this.editForm.address = ''
        this.editForm.phone = ''
        this.editForm.rId = ''
        this.loading=false;
      }
      roleList().then(res=>{
        this.roleData=res.data;
        console.log(this.roleData);
      })
    },
    // 编辑、添加提交方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          userSave(this.editForm)
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
    // 显示部门设置
    // handleunit: function(index, row) {
    //   this.unitAccessshow = true
    //   let parms = 0
    //   UserDeptdeptTree(parms)
    //     .then(res => {
    //       if (res.data.success) {
    //         this.UserDept = this.changeArr(res.data.data)
    //       } else {
    //         this.$message({
    //           type: 'info',
    //           message: res.msg
    //         })
    //       }
    //     })
    //     .catch(err => {
    //       this.loading = false
    //       this.$message.error('配置权限失败,请稍后再试！')
    //     })
    // },
    // handleClick(data, checked, node) {
    //   if (checked) {
    //     this.$refs.tree.setCheckedNodes([])
    //     this.$refs.tree.setCheckedNodes([data])
    //     this.unitparm.deptId = data.id
    //     this.unitparm.deptName = data.name
    //     //交叉点击节点
    //   } else {
    //   }
    // },
    // 保存部门
    // unitPermSave() {
    //   let len = this.selectdata
    //   let ids = []
    //   if (len != 0) {
    //     for (let i = 0; i < len.length; i++) {
    //       ids.push(len[i].userId)
    //     }
    //   }
    //   this.unitparm.userIds = ids.join(',')
    //   UserChangeDept(this.unitparm)
    //     .then(res => {
    //       this.unitAccessshow = false
    //       if (res.success) {
    //         this.$message({
    //           type: 'success',
    //           message: '部门设置成功！'
    //         })
    //         this.getdata(this.formInline)
    //       } else {
    //         this.$message({
    //           type: 'info',
    //           message: res.msg
    //         })
    //       }
    //     })
    //     .catch(err => {
    //       this.loading = false
    //       this.$message.error('部门设置失败,请稍后再试！')
    //     })
    // },
    // 选择复选框事件
    selectChange(val) {
      this.selectdata = val
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
      }
    },
    // 删除用户
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          userDelete(row.uid)
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
    // 重置密码
    // resetpwd(index, row) {
    //   this.resetpsd.userId = row.userId
    //   this.$confirm('确定要重置密码吗?', '信息', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       userPwd(this.resetpsd)
    //         .then(res => {
    //           if (res.success) {
    //             this.$message({
    //               type: 'success',
    //               message: '重置密码成功！'
    //             })
    //             this.getdata(this.formInline)
    //           } else {
    //             this.$message({
    //               type: 'info',
    //               message: res.msg
    //             })
    //           }
    //         })
    //         .catch(err => {
    //           this.loading = false
    //           this.$message.error('重置密码失败，请稍后再试！')
    //         })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '取消重置密码！'
    //       })
    //     })
    // },
    // 数据权限
    // dataAccess: function(index, row) {
    //   this.dataAccessshow = true
    //   this.saveroleId = row.userId
    //   UserDeptTree(row.userId)
    //     .then(res => {
    //       if (res.data.success) {
    //         this.checkmenu = this.changemenu(res.data.data)
    //         this.UserDept = this.changeArr(res.data.data)
    //       } else {
    //         this.$message({
    //           type: 'info',
    //           message: res.data.msg
    //         })
    //       }
    //     })
    //     .catch(err => {
    //       this.loading = false
    //       this.$message.error('获取权限失败，请稍后再试！')
    //     })
    // },
    //数据格式化
    // changeArr(data) {
    //   var pos = {}
    //   var tree = []
    //   var i = 0
    //   while (data.length != 0) {
    //     if (data[i].pId == 0) {
    //       tree.push({
    //         id: data[i].id,
    //         name: data[i].name,
    //         pId: data[i].pId,
    //         open: data[i].open,
    //         checked: data[i].checked,
    //         children: []
    //       })
    //       pos[data[i].id] = [tree.length - 1]
    //       data.splice(i, 1)
    //       i--
    //     } else {
    //       var posArr = pos[data[i].pId]
    //       if (posArr != undefined) {
    //         var obj = tree[posArr[0]]
    //         for (var j = 1; j < posArr.length; j++) {
    //           obj = obj.children[posArr[j]]
    //         }

    //         obj.children.push({
    //           id: data[i].id,
    //           name: data[i].name,
    //           pId: data[i].pId,
    //           open: data[i].open,
    //           checked: data[i].checked,
    //           children: []
    //         })
    //         pos[data[i].id] = posArr.concat([obj.children.length - 1])
    //         data.splice(i, 1)
    //         i--
    //       }
    //     }
    //     i++
    //     if (i > data.length - 1) {
    //       i = 0
    //     }
    //   }
    //   return tree
    // },
    // 选中菜单
    // changemenu(arr) {
    //   let change = []
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr[i].checked) {
    //       change.push(arr[i].id)
    //     }
    //   }
    //   return change
    // },
    // 菜单权限-保存
    // menuPermSave() {
    //   let parm = {
    //     userId: this.saveroleId,
    //     deptIds: ''
    //   }
    //   let node = this.$refs.tree.getCheckedNodes()
    //   let moduleIds = []
    //   if (node.length != 0) {
    //     for (let i = 0; i < node.length; i++) {
    //       moduleIds.push(node[i].id)
    //     }
    //     parm.deptIds = JSON.stringify(moduleIds)
    //   }
    //   UserDeptSave(parm)
    //     .then(res => {
    //       if (res.success) {
    //         this.$message({
    //           type: 'success',
    //           message: '权限保存成功'
    //         })
    //         this.dataAccessshow = false
    //         this.getdata(this.formInline)
    //       } else {
    //         this.$message({
    //           type: 'info',
    //           message: res.msg
    //         })
    //       }
    //     })
    //     .catch(err => {
    //       this.loading = false
    //       this.$message.error('权限保存失败，请稍后再试！')
    //     })
    // },
    // 下线用户
    // offlineUser(index, row) {
    //   this.$confirm('确定要让' + row.userName + '用户下线吗?', '信息', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       userExpireToken(row.userName)
    //         .then(res => {
    //           if (res.success) {
    //             this.$message({
    //               type: 'success',
    //               message: '用户' + row.userName + '强制下线成功！'
    //             })
    //             this.getdata(this.formInline)
    //           } else {
    //             this.$message({
    //               type: 'info',
    //               message: res.msg
    //             })
    //           }
    //         })
    //         .catch(err => {
    //           this.loading = false
    //           this.$message.error('用户下线失败，请稍后再试！')
    //         })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消'
    //       })
    //     })
    // },
    // // 刷新缓存
    // refreshCache(index, row) {
    //   userFlashCache(row.userName)
    //     .then(res => {
    //       if (res.success) {
    //         this.$message({
    //           type: 'success',
    //           message: '刷新成功！'
    //         })
    //         this.getdata(this.formInline)
    //       } else {
    //         this.$message({
    //           type: 'info',
    //           message: res.msg
    //         })
    //       }
    //     })
    //     .catch(err => {
    //       this.loading = false
    //       this.$message.error('刷新失败，请稍后再试！')
    //     })
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

 