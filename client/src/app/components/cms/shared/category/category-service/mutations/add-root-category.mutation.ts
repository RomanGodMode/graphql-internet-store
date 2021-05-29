import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'
import { TreeNode } from '../../category-tree/types/tree-node'


@Injectable()
export class AddRootCategoryGQL extends Mutation<{ addRootCategory: TreeNode }, { title: string }> {
  document = gql`mutation AddRootCategory($title: String!) {
    addRootCategory(title: $title) {
      id,
      title
    }
  }
  `
}


