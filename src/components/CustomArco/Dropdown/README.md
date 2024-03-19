## Dropdown Props

支持 a-dropdown 属性：<https://arco.design/vue/component/dropdown#API>

| 属性名   | 说明             | 类型                                   | 必须 | 默认值 |
| -------- | ---------------- | -------------------------------------- | ---- | ------ |
| options  | 用于生成 Doption | Option[]                               |      | []     |
| group    | 用于生成 ADgroup | { title: string, options: Option[] }[] |      | []     |
| disabled | 是否禁用         | boolean                                |      | -      |

## Type

### Option

| 属性名   | 说明                    | 类型     | 必须 |
| -------- | ----------------------- | -------- | ---- |
| label    | 标签的文本              | string   | 是   |
| click    | 处理 Doption 的点击事件 | Function | 是   |
| disabled | 是否禁用                | boolean  |      |
