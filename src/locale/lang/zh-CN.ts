import { assign } from 'lodash-es'

const locales = import.meta.glob([
  '@/components/**/locale/zh-CN.ts',
  '@/layout/**/locale/zh-CN.ts',
  '@/views/**/locale/zh-CN.ts',
], { import: 'default', eager: true })

export default {
  ...assign({}, ...Object.values(locales)),
  common: {
    add: '新增',
    create: '创建',
    edit: '编辑',
    modify: '修改',
    update: '更新',
    view: '查看',
    detail: '详情',
    delete: '删除',
    remove: '移除',
    save: '保存',
    import: '导入',
    export: '导出',
    query: '查询',
    search: '搜索',
    reset: '重置',
    refresh: '刷新',
    confirm: '确认',
    cancel: '取消',
    close: '关闭',
    tip: '提示',
    notice: '通知',
  },
  app: {
    logout: '退出登录',
    logoutTip: '是否退出本系统？',
    loginAgain: '重新登录',
    loginTimeout: '登录超时，请重新登录！',
  },
}
