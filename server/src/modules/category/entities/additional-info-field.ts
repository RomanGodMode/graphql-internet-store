import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Length, ValidateIf } from 'class-validator'
import { Field, Float, InputType, registerEnumType } from '@nestjs/graphql'

enum ProductInfoFieldTypes {
  num = 'num',
  string = 'string',
  bool = 'bool',
  enum = 'enum'
}

registerEnumType(ProductInfoFieldTypes, { name: 'ProductInfoFieldTypes' })

@InputType()
export class ProductInfoField {
  @Field()
  @IsString()
  @Length(2, 30)
  name: string

  @Field(() => ProductInfoFieldTypes)
  @IsEnum(ProductInfoFieldTypes)
  type: ProductInfoFieldTypes

  @IsNotEmpty()
  @Field(() => Float, { nullable: true })
  @ValidateIf(info => info.type === 'num', { always: true })
  @IsNumber()
  @IsPositive()
  min: number

  @Field(() => Float, { nullable: true })
  @ValidateIf(info => info.type === 'num', { always: true })
  @IsNumber()
  @IsPositive()
  max: number

  @Field(() => [String], { nullable: true })
  @ValidateIf(info => info.type === 'enum', { always: true })
  @IsString({ each: true })
  @Length(1, 40, { each: true })
  variants: string[]

}
