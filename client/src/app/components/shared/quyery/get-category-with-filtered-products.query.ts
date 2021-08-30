import { Injectable } from '@angular/core'
import { gql, Query } from 'apollo-angular'
import { Product } from '../../../types/product'
import { FullCategory } from '../../../types/category'

export type CategorizedProduct = Product & { category: number }

export type CategoryWithProducts = FullCategory & { products: CategorizedProduct[] }

export type CatalogData = {
  category: CategoryWithProducts
  productsCount: number
  maxPrice: number
  minPrice: number
}

type Data = {
  getCategory: CatalogData
}


type Vars = {
  id: number
  name: string
  pageNumber: number
  ordering: string
  maxPrice: number
  minPrice: number
}

@Injectable()
export class GetCategoryWithFilteredProductsGQL extends Query<Data, Vars> {
  document = gql`
    query GetCategoryWithFilteredProducts($id: Int!,
      $name: String
      $pageNumber: Int
      $ordering: String
      $minPrice: Float
      $maxPrice: Float
    ) {
      getCategory(id: $id, name: $name, pageNumber: $pageNumber, ordering: $ordering, maxPrice: $maxPrice, minPrice: $minPrice) {
        category{
          id,
          title,
          productInfoFields,
          products{
            id,
            name,
            price,
            image,
            infoValues,
            amount,
            category
          }
        }
        productsCount,
        maxPrice,
        minPrice
      }
    }
  `
}
