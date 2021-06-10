import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'
import { ProductInfoField } from './additional-info-field'
import { Product } from '../../products/entities/product.entity'


@ObjectType()
@Entity()
export class Category {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  parentId: number

  @ManyToOne(() => Category, category => category.children, { onDelete: 'CASCADE' })
  parent: Category

  @Field(() => [Category])
  @OneToMany(() => Category, category => category.parent)
  children: Category[]

  @Field(() => GraphQLJSON)
  @Column({ type: 'jsonb', default: [] })
  productInfoFields: ProductInfoField[]

  @Field(() => [Product])
  @OneToMany(() => Product, product => product.category)
  products: Product[]
}
