import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'
import { FullProduct, InfoValue } from '../../../../../../../types/product'

type Data = {
  createProduct: FullProduct
}

type Vars = {
  image: File
  categoryId: number
  name: string
  price: number
  infoValues: InfoValue[]
}

@Injectable()
export class CreateProductGQL extends Mutation<Data, Vars> {
  document = gql`
    mutation CreateProduct($image: Upload!, $categoryId: Int!, $name: String!, $price: Float!, $infoValues: JSON!){
      createProduct(image: $image, product: { categoryId: $categoryId, name: $name, price: $price, infoValues: $infoValues }){
        id,
        name,
        price,
        image,
        infoValues
      }
    }
  `
}
