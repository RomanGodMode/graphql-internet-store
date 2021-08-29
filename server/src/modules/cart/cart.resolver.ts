import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CartService } from './cart.service'
import GraphQLJSON from 'graphql-type-json'
import { UseGuards } from '@nestjs/common'
import { BuyerAuthGuard } from '../auth/guards/buyer-auth.guard'
import { Session } from '../auth/pipes/session.pipe'
import { CartItemInput } from './input/cart-item.input'


@Resolver()
export class CartResolver {

  constructor(private cartService: CartService) {
  }

  @Query(() => GraphQLJSON)
  @UseGuards(BuyerAuthGuard)
  async getCart(
    @Session() session
  ) {
    return this.cartService.getCart(session.userId)
  }

  @Mutation(() => GraphQLJSON)
  @UseGuards(BuyerAuthGuard)
  async setCart(
    @Session() session,
    @Args('items', { type: () => [CartItemInput] }) items: CartItemInput[]
  ) {
    return this.cartService.setCart(session.userId, items)
  }
}
