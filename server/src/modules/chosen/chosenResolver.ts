import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ChosenService } from './chosen.service'
import GraphQLJSON from 'graphql-type-json'
import { UseGuards } from '@nestjs/common'
import { BuyerAuthGuard } from '../auth/guards/buyer-auth.guard'
import { Session } from '../auth/pipes/session.pipe'


@Resolver()
export class ChosenResolver {

  constructor(private chosenService: ChosenService) {
  }

  @Query(() => GraphQLJSON)
  @UseGuards(BuyerAuthGuard)
  async getChosenProducts(
    @Session() session
  ) {
    return this.chosenService.getChosenProducts(session.userId)
  }

  @Mutation(() => GraphQLJSON)
  @UseGuards(BuyerAuthGuard)
  async setChosenProducts(
    @Session() session,
    @Args('items', { type: () => [Int] }) items: number[],
    @Args('isDelete', { type: () => Boolean }) isDelete: boolean
  ) {
    return this.chosenService.setChosenProducts(session.userId, items, isDelete)
  }
}
