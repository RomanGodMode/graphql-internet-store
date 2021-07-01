export type FullProduct = {
  id: number
  name: string
  price: number
  image: string
  infoValues: InfoValue[]
}

export type InfoValue = {
  name: string
  value: string
}

export type Product = Omit<FullProduct, 'infoValues'>
