import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'
import { Category } from '../../category/entities/category.entity'


@ObjectType()
@Entity()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
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
  infoValues: {}

  @ManyToOne(() => Category, category => category.products)
  category: Category

}
