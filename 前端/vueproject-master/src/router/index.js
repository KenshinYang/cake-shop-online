// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */
// 商品管理
import Goods from '@/views/goods/Goods';
import Layer from '@/views/goods/Types/Layer.vue';
import Shape from '@/views/goods/Types/Shape.vue';
import Taste from '@/views/goods/Types/Taste.vue';
import Browse from '@/views/goods/Browse.vue';
// 机器信息管理
//import Machine from '@/views/machine/Machine';
// 货道信息管理
//import MachineAisle from '@/views/machine/MachineAisle';
/**
 * 订单管理
 */
// 交易订单
import Order from '@/views/pay/Order';
import UserOrder from '@/views/pay/UserOrder.vue'
/**
 * 系统管理
 */
// 用户管理
import user from '@/views/system/user';
import { name } from 'file-loader';
// 菜单管理
//import Module from '@/views/system/Module';
// 角色管理
//import Role from '@/views/system/Role';
// 公司管理
//import Dept from '@/views/system/Dept';
// 系统环境变量
//import Variable from '@/views/system/Variable';
// 权限管理
//import Permission from '@/views/system/Permission';
/**
 * 支付管理
 */
// 支付配置信息
//import MachineConfig from '@/views/machine/MachineConfig';
// 支付配置
//import Config from '@/views/pay/Config';
/**
 * 数据监控
 */
// 监控查询
//import druidLogin from '@/views/druid/login';

// 图表界面
//import statistics from '@/views/charts/statistics';
import test from '@/views/test.vue'
// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [
            {
            path: '/goods/Goods',
            name: '商品管理',
            component: Goods,
            meta: {
                requireAuth: true
            },
            
        }, 
        {
            path:'/goods/Layer',
            name:'层数分类管理',
            component:Layer,
            meta: {
                requireAuth: true
            },
        },
        {
            path:'/goods/Shape',
            name:'形状分类管理',
            component:Shape,
            meta: {
                requireAuth: true
            },
        },
        {
            path:'/goods/Taste',
            name:'口味分类管理',
            component:Taste,
            meta: {
                requireAuth: true
            },
        },
        {
            path: '/browse/BrowseCakes',
            name: '蛋糕浏览',
            component: Browse,
            meta: {
                requireAuth: true
            },
            
        }, 
        {
            path: '/bookings/CakeOrders',
            name: '用户订单记录',
            component: UserOrder,
            meta: {
                requireAuth: true
            },
            
        }, 
        {
            path: '/tests/test1',
            name: '测试',
            component: test,
            meta: {
                requireAuth: true
            },
            
        }, 
        // {
        //     path: '/machine/Machine',
        //     name: '机器信息管理',
        //     component: Machine,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/machine/MachineAisle',
        //     name: '货道信息管理',
        //     component: MachineAisle,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, 
        {
            path: '/pay/Order',
            name: '交易订单',
            component: Order,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/user',
            name: '用户管理',
            component: user,
            meta: {
                requireAuth: true
            }
        }, 
        // {
        //     path: '/system/Module',
        //     name: '菜单管理',
        //     component: Module,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Role',
        //     name: '角色管理',
        //     component: Role,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Dept',
        //     name: '公司管理',
        //     component: Dept,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Variable',
        //     name: '系统环境变量',
        //     component: Variable,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Permission',
        //     name: '权限管理',
        //     component: Permission,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/machine/MachineConfig',
        //     name: '支付配置信息',
        //     component: MachineConfig,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/pay/Config',
        //     name: '支付配置',
        //     component: Config,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/druid/login',
        //     name: '监控查询',
        //     component: druidLogin,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/charts/statistics',
        //     name: '数据可视化',
        //     component: statistics,
        //     meta: {
        //         requireAuth: true
        //     }
        // }
    ]
    }]
})