import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'
import { FullProduct } from '../../../types/product'

type Data = { getProduct: FullProduct }


@Injectable()
export class GetProductsGQL extends Query<Data, { id: number }> {
  document = gql`
    query GetFullProduct($id: Int!) {
      getProduct(id: $id){
        id,
        amount,
        image,
        infoValues,
        name,
        price
      }
    }
  `
}
