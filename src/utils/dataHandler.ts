/**
 * 从数组转换成树形数据
 * @param data 数据源
 * @param idField 唯一标识符的字段名称
 * @param parentField 父级标识符的字段名称
 * @param childrenField 子节点的字段名称
 * @example arrayToTree([{ id: 0, ... }, { id: 1, parentId: 0, ... }])
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

/**
 * 从路径数组转换成树形数据
 * @param paths
 * @example pathsToTree(['views/login/index.vue', 'views/home/index.vue'])
 */
export function pathsToTree(paths: string[]) {
  interface Node {
    key: string
    name: string
    children: Node[]
  }

  const root: Node = { key: 'root', name: 'root', children: [] }

  const insertNode = (node: Node, parts: string[], prefix = '') => {
    let current = node
    let currentPath = prefix

    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part
      let child = current.children.find(c => c.name === part)
      if (!child) {
        child = { key: currentPath, name: part, children: [] }
        current.children.push(child)
      }
      current = child
    }
  }

  for (const path of paths) {
    const parts = path.split('/')
    insertNode(root, parts)
  }

  return root.children
}
