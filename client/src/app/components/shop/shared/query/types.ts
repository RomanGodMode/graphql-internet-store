import { Cart } from '../../../shared/quyery/get-cart.query'

export type Status = 'Заказан' | 'Завершён' | 'Истёк'
export type ServerStatus = 'ordered' | 'completed' | 'expired'

export type Order = {
  id: number
  userId: number
  cart: Cart
  orderingDate: string
  status: Status
}

export type ServerOrder = Order & {
  status: ServerStatus
}
