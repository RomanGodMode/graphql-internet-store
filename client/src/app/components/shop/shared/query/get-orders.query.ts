import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'
import { Cart } from '../../../shared/quyery/get-cart.query'

export type Status = 'ordered' | 'completed' | 'expired'

export type Order = {
  id: number
  userId: number
  cart: Cart
  orderingDate: string
  status: Status
}

export type Data = { myOrders: Order[] }

@Injectable()
export class GetMyOrdersGQL extends Query<Data> {
  document = gql`
    query MyOrders {
      myOrders
    }
  `
}
