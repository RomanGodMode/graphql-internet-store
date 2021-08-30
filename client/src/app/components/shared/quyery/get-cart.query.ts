import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'
import { FullProduct } from '../../../types/product'

export type Cart = {
  items: {
    [key: string]: {
      'product': FullProduct,
      'count': 3
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
