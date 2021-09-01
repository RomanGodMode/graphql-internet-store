import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'

export type Cart = {
  items: {
    [key: string]: {
      'product': any,
      'count': number
    }
  },
  totalPrice: number
}

export type OrderStatus = 'ordered' | 'completed' | 'expired'

@ObjectType()
@Entity()
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => GraphQLJSON)
  @Column({ type: 'jsonb' })
  cart: Cart

  @Field(() => Int)
  @Column({ type: 'int' })
  userId: number

  // @Field(() => String)
  // @Column({ type: 'timestamptz' })
  // orderingDate: Date
  @Field(() => String)
  @CreateDateColumn({ type: 'timestamptz' })
  orderingDate: Date

  @Field(() => String)
  @Column({ type: 'text', default: 'ordered' })
  status: OrderStatus

}
