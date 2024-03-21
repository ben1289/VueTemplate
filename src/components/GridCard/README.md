## GridCard Props

| 属性名              | 说明                                                      | 类型                                 | 必须 | 默认值                      |
| ------------------- | --------------------------------------------------------- | ------------------------------------ | ---- | --------------------------- |
| page / v-model:page | 分页参数                                                  | { pageNo: number, pageSize: number } |      | { pageNo: 1, pageSize: 20 } |
| loading             | 加载状态                                                  | boolean                              |      | false                       |
| data                | 数据                                                      | GridData[]                           |      | []                          |
| total               | 数据总数                                                  | number                               |      | 0                           |
| pagination          | 是否启用分页                                              | boolean                              |      | true                        |
| gridProps           | a-grid 属性：<https://arco.design/vue/component/grid#API> | Record<string, any>                  |      | -                           |
| cardProps           | a-card 属性：<https://arco.design/vue/component/card#API> | Record<string, any>                  |      | -                           |

## GridCard Slots

| 插槽名             | 描述                                               | 参数           |
| ------------------ | -------------------------------------------------- | -------------- |
| fixed              | 固定在第一位                                       | -              |
| `a-card`的全部插槽 | 插槽：<https://arco.design/vue/component/card#API> | item: GridData |

## Type

### GridData

`extends Record<string, any>`

| 属性名        | 说明                                                           | 类型                | 必须 |
| ------------- | -------------------------------------------------------------- | ------------------- | ---- |
| gridItemProps | a-grid-item 属性：<https://arco.design/vue/component/grid#API> | Record<string, any> |      |
| cardProps     | a-card 属性：<https://arco.design/vue/component/card#API>      | Record<string, any> |      |
