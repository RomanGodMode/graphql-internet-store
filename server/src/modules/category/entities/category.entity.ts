import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'
import { ProductInfoField } from './additional-info-field'


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

}
