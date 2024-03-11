export enum DictTypeEnum {
  COMMON_STATUS = 'common_status',
  DATA_SCOPE = 'system_data_scope',
  USER_SEX = 'system_user_sex',
  OPERATE_TYPE = 'system_operate_type',
}

export enum CommonStateEnum {
  DISABLE = 0,
  ENABLE = 1,
}

export enum DataScopeEnum {
  ALL = 1,
  DEPT_CUSTOM = 2,
  DEPT_ONLY = 3,
  DEPT_AND_CHILD = 4,
  SELF = 5,
}

export enum UserSexEnum {
  MALE = 1,
  FEMALE = 2,
}
