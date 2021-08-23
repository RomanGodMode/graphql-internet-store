import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'


@Injectable()
export class DeleteProductGQL extends Mutation<{ deleteProduct: boolean }, { id: number }> {
  document = gql`mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
  `
}


