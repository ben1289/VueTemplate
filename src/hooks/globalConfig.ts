const loading = ref(false)

export default function useGlobalConfig() {
  const appTitle = import.meta.env.VITE_APP_TITLE
  const homePath = import.meta.env.VITE_HOME_PATH
  const tenantEnable: boolean = JSON.parse(import.meta.env.VITE_TENANT_ENABLE)
  const watermark = import.meta.env.VITE_WATERMARK

  return {
    loading,
    appTitle,
    homePath,
    tenantEnable,
    watermark,
  }
}
