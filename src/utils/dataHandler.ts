/**
 * 构造树型结构数据
 * @param data 数据源
 * @param id id字段 默认 'id'
 * @param parentId 父节点字段 默认 'parentId'
 * @param children 子节点字段 默认 'children'
 */
export function generateTreeData(data: any[], id = 'id', parentId = 'parentId', children = 'children') {
  const result: any[] = []
  const hash: any = {}
  data.forEach((item) => {
    hash[item[id]] = item
  })
  data.forEach((item) => {
    const hashVP = hash[item[parentId]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
