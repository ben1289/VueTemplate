import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    componentName?: string
    keepAlive: boolean
    icon?: string
  }
}
