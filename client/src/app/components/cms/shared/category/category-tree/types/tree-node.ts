export type TreeNode = {
  id: number
  title: string
  children: TreeNode[]
}

export type PureTreeNode = Omit<TreeNode, 'id'>
