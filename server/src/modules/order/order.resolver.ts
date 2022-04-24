import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OrderService } from './order.service'
import GraphQLJSON from 'graphql-type-json'
import { UseGuards } from '@nestjs/common'
import { BuyerAuthGuard } from '../auth/guards/buyer-auth.guard'
import { Session } from '../auth/pipes/session.pipe'
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard'
import { SearchOrdersArgs } from './input/search-orders.args'
import { PatchOrderArgs } from './input/patch-order.args'


@Resolver()
export class OrderResolver {

  constructor(private orderService: OrderService) {
  }

  @Query(() => GraphQLJSON)
  @UseGuards(AdminAuthGuard)
  async searchOrders(
    @Args() args: SearchOrdersArgs
  ) {
    return this.orderService.searchOrders(args)
  }

  @Mutation(() => GraphQLJSON)
  @UseGuards(AdminAuthGuard)
  async patchOrder(@Args() { id, status }: PatchOrderArgs) {
    return this.orderService.patchOrder(id, status)
  }

  @Query(() => GraphQLJSON)
  @UseGuards(BuyerAuthGuard)
  async myOrders(@Session() session) {
    return this.orderService.getOrders(session.userId)
  }

  @Mutation(() => GraphQLJSON)
  @UseGuards(BuyerAuthGuard)
  async pushOrder(
    @Session() session
  ) {
    return this.orderService.pushOrder(session.userId)
  }

}
