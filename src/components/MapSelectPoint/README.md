## MapSelectPoint Props

| 属性名                | 说明     | 类型   | 必须 | 默认值 |
| --------------------- | -------- | ------ | ---- | ------ |
| model-value / v-model | 点位地址 | string |      | -      |

## MapSelectPoint Events

| 事件名 | 说明                                                                                               | 类型                           |
| ------ | -------------------------------------------------------------------------------------------------- | ------------------------------ |
| change | 当点位地址改变时触发，`pointInfo`包含`coordinate(坐标)、address(地址)、districtCode(行政区域编码)` | (pointInfo: PointInfo) => void |
