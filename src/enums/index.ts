export enum AuthEnum {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  TENANT_ID = 'TENANT_ID',
}

export enum LocaleEnum {
  ZH_CN = 'zh-CN',
  EN_US = 'en-US',
}

export enum MenuTypeEnum {
  DIR = 'dir',
  MENU = 'menu',
  BUTTON = 'button',
}

export enum MenuShowTypeEnum {
  LAYOUT = 'layout',
  FULL_PAGE = 'fullPage',
  LINK = 'link',
}

export enum PasswordStateEnum {
  NORMAL = -1,
  INIT = 0,
  LONG_TERM = 1,
}

export enum CryptoEnum {
  SM4 = 'sm4',
  AES = 'aes',
}

export * from './dict'
