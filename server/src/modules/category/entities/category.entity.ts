import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'


@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ unique: true })
  title: string

  @Field()
  @Column({ nullable: true })
  parentId: number

  @ManyToOne(() => Category, category => category.children, { onDelete: 'CASCADE' })
  parent: Category

  @Field(() => [Category])
  @OneToMany(() => Category, category => category.parent)
  children: Category[]

  // @Field(() => J)
  @Column({ type: 'jsonb', default: {} })
  additionalInfo: {}

}
