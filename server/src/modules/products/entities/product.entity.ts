import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'
import { Category } from '../../category/entities/category.entity'

export type InfoValue = {
  name: string
} & ({
  value: string
} | {
  minValue: number
  maxValue: number
})

@ObjectType()
@Entity()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ unique: true })
  name: string

  @Field()
  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number

  @Field()
  @Column()
  image: string

  @Field(() => Int)
  @Column()
  amount: number

  @Field(() => GraphQLJSON)
  @Column({ type: 'jsonb' })
  infoValues: InfoValue[]

  @ManyToOne(() => Category, category => category.products)
  category: Category

}
