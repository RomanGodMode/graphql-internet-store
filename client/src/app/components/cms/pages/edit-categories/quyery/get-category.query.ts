import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'
import { FullCategory } from '../../../../../types/category'

type Data = { getCategory: FullCategory }


@Injectable()
export class GetFullCategoryGQL extends Query<Data, { id: number }> {
  document = gql`
    query GetFullCategory($id: Int!) {
      getCategory(id: $id) {
        id,
        title,
        productInfoFields
      }
    }
  `
}
