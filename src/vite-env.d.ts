/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_API_URL: string
  readonly VITE_HOME_PATH: string
  readonly VITE_TENANT_ENABLE: string
  readonly VITE_WATERMARK: string
  readonly VITE_API_CRYPTO_ENABLE: string
  readonly VITE_SM4_SECRET_KEY: string
  readonly VITE_AES_SECRET_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
