import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'
import { ServerStatus } from '../query/types'

type Vars = {
  id: number
  status: ServerStatus
}

@Injectable()
export class PatchOrderGQL extends Mutation<{}, Vars> {
  document = gql`
    mutation patchOrder($id: Int!, $status: String!){
      patchOrder(id: $id, status: $status)
    }
  `
}


