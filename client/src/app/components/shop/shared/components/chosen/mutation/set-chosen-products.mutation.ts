import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'

type Data = { setChosenProducts: {} }

@Injectable()
export class SetChosenProducts extends Mutation<Data, { items: number[], isDelete: boolean }> {
  document = gql`mutation SetChosenProducts($items: [Int!]!, $isDelete: Boolean!) {
    setChosenProducts(items: $items, isDelete: $isDelete)
  }
  `
}


