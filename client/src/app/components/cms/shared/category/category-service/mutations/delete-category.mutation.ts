import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'


@Injectable()
export class DeleteCategoryGQL extends Mutation<{ deleteCategory: boolean }, { id: number }> {
  document = gql`mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
  `
}


