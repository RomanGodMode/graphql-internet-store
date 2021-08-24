import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'
import { CategoryWithProducts } from '../../../types/category'

type Data = { getCategory: { category: CategoryWithProducts, productsCount: number } }


@Injectable()
export class GetCategoryWithProductsGQL extends Query<Data, { id: number }> {
  document = gql`
    query GetFullCategory($id: Int!) {
      getCategory(id: $id) {
        category{
          id,
          title,
          productInfoFields,
          products{
            id,
            name,
            price,
            image,
            infoValues,
            amount
          }
        }
        productsCount
      }
    }
  `
}
