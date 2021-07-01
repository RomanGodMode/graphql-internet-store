import { Omit } from 'apollo-angular/types'
import { Product } from './product'

export type FullCategory = {
  id: number
  title: string
  productInfoFields: ProductInfoField[]
}

export type CategoryWithProducts = FullCategory & { products: Product[] }

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
