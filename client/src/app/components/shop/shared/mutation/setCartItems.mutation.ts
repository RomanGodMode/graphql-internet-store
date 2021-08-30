import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'

type Data = { setCart: {} }
export type CartItemInput = {
  productId: number
  count: number
}

@Injectable()
export class SetCartItemsGQL extends Mutation<Data, { items: CartItemInput[] }> {
  document = gql`mutation setCartItems($items: [CartItemInput!]!) {
    setCart(items: $items)
  }
  `
}


