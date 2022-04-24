import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'
import { ServerOrder } from './types'

export type Data = { myOrders: ServerOrder[] }

@Injectable()
export class GetMyOrdersGQL extends Query<Data> {
  document = gql`
    query MyOrders {
      myOrders
    }
  `
}
