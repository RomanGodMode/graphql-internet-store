import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'
import { TreeNode } from '../../category-tree/types/tree-node'


@Injectable()
export class AddSubCategoryGQL extends Mutation<{ addSubCategory: TreeNode }, { parentId: number, title: string }> {
  document = gql`mutation AddSubCategory($parentId: Int!, $title: String!) {
    addSubCategory(parentId: $parentId, title: $title) {
      id,
      title
    }
  }
  `
}


