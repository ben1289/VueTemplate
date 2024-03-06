## SearchInput Props

| 属性名                | 说明                                                                                                                      | 类型                                                      | 必须 | 默认值                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ---- | ------------------------------------------------------ |
| value / v-model:value | 绑定值                                                                                                                    | string \| number                                          |      | -                                                      |
| label / v-model:label | 绑定显示值                                                                                                                | string \| number                                          |      | -                                                      |
| fieldNames            | 字段名                                                                                                                    | { valueKey?: string, labelKey?: string, rowKey?: string } |      | { valueKey: 'value', labelKey: 'label', rowKey: 'id' } |
| columns               | 支持 a-table 的 TableColumnData：<https://arco.design/vue/component/table#API>                                            | TableColumnData[]                                         | 是   | -                                                      |
| fetchData             | 用于获取表格分页的数据，`params`为查询字符串、分页参数，需要返回一个`Promise`，结果为`{ data: [], total: 0 }`用于数据渲染 | (params: FetchParams) => Promise\<FetchResult>            | 是   | -                                                      |

## SearchInput Events

| 事件名 | 说明           | 类型                                        |
| ------ | -------------- | ------------------------------------------- |
| change | 当值改变时触发 | (value: string \| number, row: Row) => void |

## SearchMultipleInput Props

| 属性名                | 说明                                                                                                                      | 类型                                           | 必须 | 默认值                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---- | ---------------------------------------- |
| value / v-model:value | 绑定值                                                                                                                    | string[] \| number[]                           |      | -                                        |
| label / v-model:label | 绑定显示值                                                                                                                | string[] \| number[]                           |      | -                                        |
| fieldNames            | 字段名                                                                                                                    | { valueKey?: string, labelKey?: string }       |      | { valueKey: 'value', labelKey: 'label' } |
| columns               | 支持 a-table 的 TableColumnData：<https://arco.design/vue/component/table#API>                                            | TableColumnData[]                              | 是   | -                                        |
| fetchData             | 用于获取表格分页的数据，`params`为查询字符串、分页参数，需要返回一个`Promise`，结果为`{ data: [], total: 0 }`用于数据渲染 | (params: FetchParams) => Promise\<FetchResult> | 是   | -                                        |
| maxTags               | 最大显示的Tag数量，超出则折叠显示                                                                                         | number                                         |      | -                                        |

## SearchMultipleInput Events

| 事件名 | 说明           | 类型                                               |
| ------ | -------------- | -------------------------------------------------- |
| change | 当值改变时触发 | (value: string[] \| number[], rows: Row[]) => void |
