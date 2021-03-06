import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading
Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: _import('error/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: _import('admin/user/index')
      }
    ]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'form',
    noDropdown: true,
    children: [
      {
        path: 'index',
        component: _import('introduction/index'),
        name: '简述'
      }
    ]
  },
  // 基础配置管理
  {
    path: '/baseManager',
    component: Layout,
    name: '基础配置管理',
    icon: 'setting',
    authority: 'baseManager',
    children: [
      {
        path: 'integralManagement',
        icon: 'plus-square-o',
        component: _import('admin/sample/index'),
        name: '基因样本信息',
        authority: 'integralManagement'
      },
      {
        path: 'exchange',
        icon: 'fa-user',
        component: _import('admin/Testing/index'),
        name: '基因检测信息',
        authority: 'exchange'
      },
      {
        path: 'userManager',
        icon: 'fa-user',
        component: _import('admin/user/index'),
        name: '用户管理',
        authority: 'userManager'
      },
      {
        path: 'menuManager',
        icon: 'category',
        component: _import('admin/menu/index'),
        name: '菜单管理',
        authority: 'menuManager'
      },
      {
        path: 'groupManager',
        icon: 'group_fill',
        component: _import('admin/group/index'),
        name: '角色权限管理',
        authority: 'groupManager'
      },
      {
        path: 'groupTypeManager',
        icon: 'fa-users',
        component: _import('admin/groupType/index'),
        name: '角色类型管理',
        authority: 'groupTypeManager'
      },
      {
        path: 'gateLogManager',
        icon: 'viewlist',
        component: _import('admin/gateLog/index'),
        name: '操作日志管理',
        authority: 'gateLogManager'
      }
    ]
  },
  // 合作单位管理
  {
    path: '/admin',
    component: Layout,
    name: '合作单位管理',
    icon: 'setting',
    authority: 'admin',
    children: [
      {
        path: 'doctor',
        icon: 'plus-square-o',
        component: _import('admin/znew/hezuo/doctor/index'),
        name: '医院管理',
        authority: 'doctor'
      },
      {
        path: 'channel',
        icon: 'plus-square-o',
        component: _import('admin/znew/hezuo/channel/index'),
        name: '渠道管理',
        authority: 'channel'
      },
      {
        path: 'dept',
        icon: 'plus-square-o',
        component: _import('admin/znew/hezuo/dept/index'),
        name: '科室管理',
        authority: 'dept'
      }
    ]
  },
  // 规则管理
  {
    path: '/rule',
    component: Layout,
    name: '规则管理',
    icon: 'rule',
    authority: 'rule',
    children: [
      {
        path: 'rule',
        icon: 'plus-square-o',
        component: _import('admin/znew/rule/index'),
        name: '规则管理',
        authority: 'doctor'
      }
    ]
  },
  // 医生管理
  {
    path: '/doct',
    component: Layout,
    name: '医生管理',
    icon: 'doct',
    authority: 'doct',
    children: [
      {
        path: 'doct',
        icon: 'plus-square-o',
        component: _import('admin/znew/doct/index'),
        name: '医生管理',
        authority: 'doct'
      }
    ]
  },
  // 患者数据管理
  {
    path: '/patient',
    component: Layout,
    name: '患者数据管理',
    icon: 'patient',
    authority: 'patient',
    children: [
      {
        path: 'pinfo',
        icon: 'plus-square-o',
        component: _import('admin/znew/patient/pinfo/index'),
        name: '患者信息',
        authority: 'pinfo'
      },
      {
        path: 'durgdata',
        icon: 'plus-square-o',
        component: _import('admin/znew/patient/durgdata/index'),
        name: '用药数据',
        authority: 'durgdata'
      },
      {
        path: 'sickdata',
        icon: 'plus-square-o',
        component: _import('admin/znew/patient/sickdata/index'),
        name: '病例数据',
        authority: 'sickdata'
      },
      {
        path: 'sickinfo',
        icon: 'plus-square-o',
        component: _import('admin/znew/patient/sickinfo/index'),
        name: '病种信息',
        authority: 'sickinfo'
      }
    ]
  },
  // 课题管理
  {
    path: '/topic',
    component: Layout,
    name: '课题管理',
    icon: 'fa',
    authority: 'admin',
    children: [
      {
        path: 'topic',
        icon: 'plus-square-o',
        component: _import('admin/znew/topic/topic/index'),
        name: '主课题管理',
        authority: 'admin'
      },
      {
        path: 'top',
        icon: 'plus-square-o',
        component: _import('admin/znew/topic/top/index/index'),
        name: '子课题管理',
        authority: 'admin'
      }
    ]
  },
  // 病例识别
  {
    path: '/sickknow',
    component: Layout,
    name: '病例识别',
    icon: 'fa',
    authority: 'admin',
    children: [
      {
        path: 'sickknow',
        icon: 'plus-square-o',
        component: _import('admin/znew/sickknow/index'),
        name: '识别上传病例',
        authority: 'admin'
      }
    ]
  },
  // 公告数据管理
  {
    path: '/notice',
    component: Layout,
    name: '公告数据管理',
    icon: 'fa',
    authority: 'admin',
    children: [
      {
        path: 'noticeData',
        icon: 'plus-square-o',
        component: _import('admin/znew/notice/index'),
        name: '公告管理',
        authority: 'admin'
      }
    ]
  },
  // 数据上传下载
  {
    path: '/geneUpdata',
    component: Layout,
    name: '数据上传下载',
    icon: 'fa',
    authority: 'admin',
    children: [
      {
        path: 'geneUpdata',
        icon: 'plus-square-o',
        component: _import('admin/znew/dataUpdata/index'),
        name: '数据上传下载',
        authority: 'admin'
      },
      {
        path: 'health',
        icon: 'plus-square-o',
        component: _import('admin/znew/dataUpdata/health'),
        name: '健康数据上传',
        authority: 'admin'
      }
    ]
  },
  {
    path: '/authManager',
    component: Layout,
    name: '基础配置管理',
    icon: 'setting',
    authority: 'authManager',
    children: [
      {
        path: 'serviceManager',
        component: _import('auth/service/index'),
        name: '用户管理',
        authority: 'serviceManager'
      }
    ]
  },
  {
    path: '/monitorManager',
    component: Layout,
    name: '监控模块管理',
    icon: 'setting',
    authority: 'monitorManager',
    children: [
      {
        path: 'serviceEurekaManager',
        component: _import('monitor/eureka/index'),
        name: 'Eureka注册中心',
        authority: 'serviceEurekaManager'
      },
      {
        path: 'serviceMonitorManager',
        component: _import('monitor/service/index'),
        name: '服务状态监控',
        authority: 'serviceMonitorManager'
      },
      {
        path: 'serviceZipkinManager',
        component: _import('monitor/zipkin/index'),
        name: '服务状态监控',
        authority: 'serviceZipkinManager'
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/baseManager',
    component: Layout,
    name: '基础配置管理',
    icon: 'setting',
    authority: 'baseManager',
    children: [
      {
        path: 'userManager',
        icon: 'fa-user',
        component: _import('admin/user/index'),
        name: '用户管理',
        authority: 'userManager'
      },
      {
        path: 'menuManager',
        icon: 'category',
        component: _import('admin/menu/index'),
        name: '菜单管理',
        authority: 'menuManager'
      },
      {
        path: 'groupManager',
        icon: 'group_fill',
        component: _import('admin/group/index'),
        name: '角色权限管理',
        authority: 'groupManager'
      },
      {
        path: 'groupTypeManager',
        icon: 'fa-users',
        component: _import('admin/groupType/index'),
        name: '角色类型管理',
        authority: 'groupTypeManager'
      },
      {
        path: 'gateLogManager',
        icon: 'viewlist',
        component: _import('admin/gateLog/index'),
        name: '操作日志管理',
        authority: 'gateLogManager'
      }
    ]
  }
]
