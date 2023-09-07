/**
* 左边菜单
*/ 
<template>
  <el-menu :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo.png" alt="">
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import { menu } from '../api/userMG'
export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: [],
      userMenu: [
        {
          menuid: 4,
              icon: 'icon-cat-skuQuery',
              menuname: '商品浏览',
              hasThird: null,
              url: null,
              menus: [
                {
                  menuid: 41,
                  icon: 'icon-cat-skuQuery',
                  menuname: '蛋糕浏览',
                  hasThird: 'N',
                  url: 'browse/BrowseCakes',
                  menus: null
                },
              ]
        },
        {
          menuid: 5,
              icon: 'icon-cat-skuQuery',
              menuname: '订单记录',
              hasThird: null,
              url: null,
              menus: [
                {
                  menuid: 41,
                  icon: 'icon-cat-skuQuery',
                  menuname: '蛋糕订单记录',
                  hasThird: 'N',
                  url: 'bookings/CakeOrders',
                  menus: null
                },
              ]
        },
        // {
        //   menuid: 6,
        //       icon: 'icon-cat-skuQuery',
        //       menuname: '测试',
        //       hasThird: null,
        //       url: null,
        //       menus: [
        //         {
        //           menuid: 41,
        //           icon: 'icon-cat-skuQuery',
        //           menuname: '测试页面1',
        //           hasThird: 'N',
        //           url: 'tests/test1',
        //           menus: null
        //         },
        //       ]
        // },
      ],
      adminMenu: [
        {
          menuid: 1,
          icon: 'li-icon-xiangmuguanli',
          menuname: '基础管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 11,
              icon: 'icon-cat-skuQuery',
              menuname: '商品管理',
              hasThird: 'N',
              url: 'goods/Goods',
              menus: null
            },
            {
              menuid: 121,
              icon: 'icon-cs-manage',
              menuname: '口味分类管理',
              hasThird: 'N',
              url: 'goods/Taste',
              menus: null
            },
            {
              menuid: 122,
              icon: 'icon-cs-manage',
              menuname: '形状分类管理',
              hasThird: 'N',
              url: 'goods/Shape',
              menus: null
            },
            {
              menuid: 123,
              icon: 'icon-cs-manage',
              menuname: '层数分类管理',
              hasThird: 'N',
              url: 'goods/Layer',
              menus: null
            },
          ]
        },
        {
          menuid: 2,
          icon: 'li-icon-dingdanguanli',
          menuname: '订单管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 21,
              icon: 'icon-order-manage',
              menuname: '交易订单',
              hasThird: 'N',
              url: 'pay/Order',
              menus: null
            }
          ]
        },
        {
          menuid: 3,
          icon: 'li-icon-xitongguanli',
          menuname: '系统管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 31,
              icon: 'icon-cus-manage',
              menuname: '用户管理',
              hasThird: 'N',
              url: 'system/user',
              menus: null
            },
          ]
        },
      ],
    }
  },
  methods:{
    GetMenu(){
      let userData=JSON.parse(localStorage.getItem('userdata'));
      console.log('userData:'+userData);
      if(userData.rId==1){
        this.allmenu=this.adminMenu;
        console.log('管理员菜单');
      }else{
        this.allmenu=this.userMenu;
        console.log('用户菜单');
      }      
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.GetMenu();
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>