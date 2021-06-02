import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'
import { FullCategory, ProductInfoField } from '../../../../../types/category'

type Data = {
  editCategory: FullCategory
}

type Vars = {
  input: {
    id: number
    title: string
  },
  productInfoFields: ProductInfoField[]
}

@Injectable()
export class EditCategoryGQL extends Mutation<Data, Vars> {
  document = gql`
    mutation EditCategory($input: EditCategoryInput!, $productInfoFields:  [ProductInfoField!]!){
      editCategory(
        input: $input
        productInfoFields: $productInfoFields
      ) {
        id
        title
        productInfoFields
      }
    }
  `

}
