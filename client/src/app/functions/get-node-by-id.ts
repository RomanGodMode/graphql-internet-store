import { TreeNode } from '../components/cms/shared/category/category-tree/types/tree-node'


const getNodeByIdFromOneRoot = (root: TreeNode, id: number) => {
  const stack: TreeNode[] = []

  if (id === root.id) {
    return root
  }

  root.children.forEach(c => stack.push(c))

  while (stack.length) {
    const node = stack.pop()
    if (id === node.id) {
      return node
    }
    node.children.forEach(c => stack.push(c))
  }

  return null
}

export const getNodeById = (treeRoots: TreeNode[], id: number) => {
  for (const root of treeRoots) {
    const result = getNodeByIdFromOneRoot(root, id)
    if (result !== null) {
      return result
    }
  }

  throw new Error('НЕ нашёл я во всех деревьях')
}
