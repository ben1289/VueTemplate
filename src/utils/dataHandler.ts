/**
 * 从数组转换成树形数据
 * @param data 数据源
 * @param idField 唯一标识符的字段名称
 * @param parentField 父级标识符的字段名称
 * @param childrenField 子节点的字段名称
 */
export function arrayToTree(
  data: Record<string, any>[],
  idField = 'id',
  parentField = 'parentId',
  childrenField = 'children',
) {
  const result: any[] = []
  const hash: any = {}
  data.forEach((item) => {
    hash[item[idField]] = item
  })
  data.forEach((item) => {
    const parentItem = hash[item[parentField]]
    if (parentItem) {
      !parentItem[childrenField] && (parentItem[childrenField] = [])
      parentItem[childrenField].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
