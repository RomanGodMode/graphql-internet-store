import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'
import { TreeNode } from '../../cms/shared/category/category-tree/types/tree-node'

type Data = { getEntireTree: TreeNode[] }


@Injectable()
export class EntireCategoryTreeGQL extends Query<Data> {
  document = gql`
    query {
      getEntireTree
    }
  `
}
