import { Omit } from 'apollo-angular/types'

export type FullCategory = {
  id: number
  title: string
  productInfoFields: ProductInfoField[]
}

export type Category = Omit<FullCategory, 'productInfoFields'>

export type ProductInfoField =
  {
    name: string
    type: 'num'
    min: number
    max: number
  }
  |
  {
    name: string
    type: 'string'
  }
  |
  {
    name: string
    type: 'bool'
  }
  |
  {
    name: string
    type: 'enum'
    variants: string[]
  }
