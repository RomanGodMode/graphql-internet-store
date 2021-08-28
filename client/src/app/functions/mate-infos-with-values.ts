import { ProductInfoField } from '../types/category'
import { InfoValue } from '../types/product'
import { zip } from './zip'


export const mateInfosWithValues = (productInfoFields: ProductInfoField[], values: InfoValue[]) =>
  zip(productInfoFields, values).map(([info, val]) => ({
    info,
    value: val.value
  }))

export type MatedInfos = ReturnType<typeof mateInfosWithValues>
