import { Injectable } from '@angular/core'
import { gql, Mutation } from 'apollo-angular'

type Data = {
  createProduct: boolean
}

type Vars = {
  image: File
}

@Injectable()
export class UploadFileGQL extends Mutation<Data, Vars> {
  document = gql`
    mutation CreateProduct($image: Upload!){
      createProduct(image: $image)
    }
  `
}
