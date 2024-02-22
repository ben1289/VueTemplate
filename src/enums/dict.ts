export enum dictTypeEnum {
  COMMON_STATUS = 'common_status',
  DATA_SCOPE = 'system_data_scope',
  USER_SEX = 'system_user_sex',
}

export enum commonStateEnum {
  DISABLE = 0,
  ENABLE = 1,
}

export enum dataScopeEnum {
  ALL = 1,
  DEPT_CUSTOM = 2,
  DEPT_ONLY = 3,
  DEPT_AND_CHILD = 4,
  SELF = 5,
}

export enum userSexEnum {
  MALE = 1,
  FEMALE = 2,
}
