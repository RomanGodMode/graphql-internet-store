import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'
import { CategorizedProduct } from './get-category-with-filtered-products.query'

export type Cart = {
  items: {
    [key: string]: {
      'product': CategorizedProduct,
      'count': number
    }
  },
  totalPrice: number
}

type Data = { getCart: Cart }

@Injectable()
export class GetCartGQL extends Query<Data> {
  document = gql`
    query GetCart {
      getCart
    }
  `
}
