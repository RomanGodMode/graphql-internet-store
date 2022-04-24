import { ServerOrder, ServerStatus } from './types'
import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'

export type Data = { searchOrders: ServerOrder[] }

type Vars = {
  id: number | null
  status: ServerStatus | null
}

@Injectable()
export class SearchOrdersGQL extends Query<Data, Vars> {
  document = gql`
    query SearchOrders (
      $id: Int,
      $status: String
    ) {
      searchOrders(id: $id, status: $status)
    }
  `
}
