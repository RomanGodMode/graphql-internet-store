import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'
import { CategorizedProduct } from '../../../../../shared/quyery/get-category-with-filtered-products.query'

export type ChosenProducts = {
  [key: string]: CategorizedProduct
}

type Data = { getChosenProducts: ChosenProducts }

@Injectable()
export class GetChosenProducts extends Query<Data> {
  document = gql`
    query GetChosenProducts {
      getChosenProducts
    }
  `
}
