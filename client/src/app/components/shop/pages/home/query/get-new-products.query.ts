import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'
import { CategorizedProduct } from '../../../../shared/quyery/get-category-with-filtered-products.query'

type Data = {
  getNewProducts: CategorizedProduct[]
}

@Injectable()
export class GetNewProductsGQL extends Query<Data> {
  document = gql`
    query getNewProducts {
      getNewProducts
    }
  `
}
