import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'
import { FullProduct, InfoValue } from '../../../../../../../types/product'

type Data = {
  replaceProduct: FullProduct
}

type Vars = {
  image: File
  id: number
  name: string
  price: number
  amount: number
  infoValues: InfoValue[]
}

@Injectable()
export class EditProductGQL extends Mutation<Data, Vars> {
  document = gql`
    mutation replaceProduct($image: Upload!, $id: Int!, $name: String!, $price: Float!, $amount: Int!, $infoValues: JSON!){
      replaceProduct(id: $id, image: $image, product: { name: $name, price: $price, amount: $amount, infoValues: $infoValues }){
        id,
        name,
        price,
        image,
        infoValues
      }
    }
  `
}
