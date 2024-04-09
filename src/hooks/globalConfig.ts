export default function useGlobalConfig() {
  const appTitle = import.meta.env.VITE_APP_TITLE
  const baseUrl = import.meta.env.VITE_BASE_URL
  const apiUrl = import.meta.env.VITE_API_URL
  const homePath = import.meta.env.VITE_HOME_PATH
  const tenantEnable: boolean = JSON.parse(import.meta.env.VITE_TENANT_ENABLE)
  const watermark = import.meta.env.VITE_WATERMARK
  const sm4SecretKey = import.meta.env.VITE_SM4_SECRET_KEY
  const aesSecretKey = import.meta.env.VITE_AES_SECRET_KEY

  return {
    appTitle,
    baseUrl,
    apiUrl,
    homePath,
    tenantEnable,
    watermark,
    sm4SecretKey,
    aesSecretKey,
  }
}
