import { Mutation, Query, Resolver } from '@nestjs/graphql'
import { OrderService } from './order.service'
import GraphQLJSON from 'graphql-type-json'
import { UseGuards } from '@nestjs/common'
import { BuyerAuthGuard } from '../auth/guards/buyer-auth.guard'
import { Session } from '../auth/pipes/session.pipe'


@Resolver()
export class OrderResolver {

  constructor(private orderService: OrderService) {
  }


  // @Query(() => GraphQLJSON)
  // @UseGuards(AdminAuthGuard)
  // async getOrders(
  //
  // ) {
  //
  // }
  //
  // @Mutation(() => GraphQLJSON)
  // @UseGuards(AdminAuthGuard)
  // async patchOrder() {
  //
  // }

  @Query(() => GraphQLJSON)
  @UseGuards(BuyerAuthGuard)
  async myOrders(@Session() session) {
    return this.orderService.myOrders(session.userId)
  }

  @Mutation(() => GraphQLJSON)
  @UseGuards(BuyerAuthGuard)
  async pushOrder(
    @Session() session
  ) {
    return this.orderService.pushOrder(session.userId)
  }

}
