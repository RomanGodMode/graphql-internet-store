import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { GqlExecutionContext } from '@nestjs/graphql'

export const Session = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const req: Request = ctx.getContext().req
    return req.session
  }
)
