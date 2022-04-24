import { Status } from '../components/shop/shared/query/types'


const resolver = {
  ordered: 'Заказан',
  completed: 'Завершён',
  expired: 'Истёк'
}

export const localizeStatus = (status: Status) => resolver[status]

