## QueryForm Props

支持 a-form 属性：<https://arco.design/vue/component/form#API>

| 属性名 | 说明         | 类型                | 必须 | 默认值 |
| ------ | ------------ | ------------------- | ---- | ------ |
| model  | 表单数据对象 | Record<string, any> | 是   | -      |
| schema | 绑定显示值   | FormSchema[]        | 是   | -      |

## Type

### FormSchema

| 属性名         | 说明                                                                                                                                 | 类型                | 必须 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ---- |
| label          | 标签的文本                                                                                                                           | string              | 是   |
| field          | 表单元素在数据对象中的字段                                                                                                           | string              | 是   |
| formItemAttrs  | 绑定至`a-form-item`的`attrs`                                                                                                         | Record<string, any> |      |
| component      | 组件类型`input \| select \| time \| timeRange \| date \| dateRange \| dateTime \| dateTimeRange`，填其它字符串则会转为具名插槽的name | string              | 是   |
| componentAttrs | 绑定至`component`的`attrs`                                                                                                           | Record<string, any> |      |
