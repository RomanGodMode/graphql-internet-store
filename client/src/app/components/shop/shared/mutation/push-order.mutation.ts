import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'

type Data = {}

@Injectable()
export class PushOrderGQL extends Mutation<Data> {
  document = gql`
    mutation pushOrder{
      pushOrder
    }
  `
}


